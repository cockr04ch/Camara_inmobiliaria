import { Request, Response } from 'express'
import { db } from '../lib/db.js'
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js'

const MAIN_PROGRAM_CODES = new Set(['PADI', 'PEGI', 'PREANI', 'CIBIR'])

function normalizeProgramaCodigo(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const code = value.trim().toUpperCase()
  return MAIN_PROGRAM_CODES.has(code) ? code : null
}

async function upsertEstudianteByEmail(params: {
  nombreCompleto: string
  cedulaRif?: string | null
  email: string
  telefono?: string | null
  tipo?: 'Regular' | 'Agremiado'
}): Promise<{ id_estudiante: number }> {
  const { nombreCompleto, cedulaRif, email, telefono, tipo } = params

  const existing = await db.execute({
    sql: `SELECT id_estudiante FROM estudiantes WHERE email = ? LIMIT 1`,
    args: [email],
  })
  if (existing.rows[0]?.id_estudiante) {
    const id = existing.rows[0].id_estudiante as number
    await db.execute({
      sql: `UPDATE estudiantes
            SET nombre_completo = COALESCE(?, nombre_completo),
                cedula_rif = COALESCE(?, cedula_rif),
                telefono = COALESCE(?, telefono),
                tipo = COALESCE(?, tipo),
                actualizado_en = ?
            WHERE id_estudiante = ?`,
      args: [
        nombreCompleto || null,
        cedulaRif ?? null,
        telefono ?? null,
        tipo ?? null,
        new Date().toISOString(),
        id,
      ],
    })
    return { id_estudiante: id }
  }

  const inserted = await db.execute({
    sql: `INSERT INTO estudiantes (cedula_rif, nombre_completo, email, telefono, tipo)
          VALUES (?, ?, ?, ?, ?) RETURNING id_estudiante`,
    args: [cedulaRif ?? null, nombreCompleto, email, telefono ?? null, tipo ?? 'Regular'],
  })
  return { id_estudiante: inserted.rows[0].id_estudiante as number }
}

/**
 * POST /api/public/preinscripciones
 * Preinscripción pública obligatoria para programas principales (PADI/PEGI/PREANI/CIBIR).
 */
export const publicPreinscribirProgramaPrincipal = async (req: Request, res: Response): Promise<void> => {
  try {
    const programaCodigo = normalizeProgramaCodigo(req.body?.programaCodigo)
    const nombreCompleto = typeof req.body?.nombreCompleto === 'string' ? req.body.nombreCompleto.trim() : ''
    const cedulaRif = typeof req.body?.cedulaRif === 'string' ? req.body.cedulaRif.trim() : null
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const telefono = typeof req.body?.telefono === 'string' ? req.body.telefono.trim() : null

    if (!programaCodigo) {
      res.status(400).json({ success: false, message: 'programaCodigo inválido. Use PADI/PEGI/PREANI/CIBIR.' })
      return
    }
    if (!nombreCompleto || !email) {
      res.status(400).json({ success: false, message: 'nombreCompleto y email son requeridos' })
      return
    }

    const { id_estudiante } = await upsertEstudianteByEmail({
      nombreCompleto,
      cedulaRif,
      email,
      telefono,
      tipo: 'Regular',
    })

    const now = new Date().toISOString()
    const result = await db.execute({
      sql: `INSERT INTO inscripciones_cursos (id_estudiante, id_curso, programa_codigo, estatus, creado_en, actualizado_en)
            VALUES (?, NULL, ?, 'Preinscrito', ?, ?)
            ON CONFLICT DO UPDATE SET actualizado_en = excluded.actualizado_en
            RETURNING *`,
      args: [id_estudiante, programaCodigo, now, now],
    })

    res.status(201).json({
      success: true,
      message: 'Preinscripción registrada. Un administrador debe aprobarla para formalizar la inscripción.',
      data: result.rows[0],
    })
  } catch (error) {
    console.error('publicPreinscribirProgramaPrincipal:', error)
    res.status(500).json({ success: false, message: 'Error al procesar la preinscripción' })
  }
}

/**
 * GET /api/academia/cursos
 * Lista cursos académicos (cohortes) — para panel admin.
 */
export const adminListCursos = async (req: Request, res: Response): Promise<void> => {
  try {
    const estatus = typeof req.query?.estatus === 'string' ? req.query.estatus : undefined
    const allowed = new Set(['Abierto', 'Cerrado', 'En curso'])
    const where = estatus && allowed.has(estatus) ? 'WHERE estatus = ?' : ''
    const args = estatus && allowed.has(estatus) ? [estatus] : []

    const result = await db.execute({
      sql: `SELECT * FROM cursos ${where} ORDER BY id_curso DESC`,
      args,
    })
    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('adminListCursos:', error)
    res.status(500).json({ success: false, message: 'Error al obtener cursos' })
  }
}

/**
 * GET /api/academia/preinscripciones
 * Lista preinscripciones por programa (admin).
 */
export const adminListPreinscripciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const programaCodigo = normalizeProgramaCodigo(req.query?.programaCodigo)
    const estatus = typeof req.query?.estatus === 'string' ? req.query.estatus : 'Preinscrito'
    const allowedStatus = new Set(['Preinscrito', 'Inscrito', 'Rechazado', 'Cancelado'])
    if (!allowedStatus.has(estatus)) {
      res.status(400).json({ success: false, message: 'estatus inválido' })
      return
    }

    const whereParts: string[] = [`ic.programa_codigo IS NOT NULL`, `ic.id_curso IS NULL`, `ic.estatus = ?`]
    const args: any[] = [estatus]
    if (programaCodigo) {
      whereParts.push('ic.programa_codigo = ?')
      args.push(programaCodigo)
    }

    const result = await db.execute({
      sql: `
        SELECT
          ic.*,
          e.nombre_completo as estudiante_nombre,
          e.email as estudiante_email,
          e.telefono as estudiante_telefono,
          e.cedula_rif as estudiante_cedula_rif
        FROM inscripciones_cursos ic
        JOIN estudiantes e ON e.id_estudiante = ic.id_estudiante
        WHERE ${whereParts.join(' AND ')}
        ORDER BY ic.creado_en DESC
      `,
      args,
    })

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('adminListPreinscripciones:', error)
    res.status(500).json({ success: false, message: 'Error al obtener preinscripciones' })
  }
}

/**
 * POST /api/academia/cursos/:id_curso/asignar
 * Carga/Asignación manual: el admin asigna un estudiante a un curso abierto.
 */
export const adminAsignarEstudianteACurso = async (req: Request, res: Response): Promise<void> => {
  try {
    const idCurso = Number(req.params.id_curso)
    if (!Number.isFinite(idCurso)) {
      res.status(400).json({ success: false, message: 'id_curso inválido' })
      return
    }

    const nombreCompleto = typeof req.body?.nombreCompleto === 'string' ? req.body.nombreCompleto.trim() : ''
    const cedulaRif = typeof req.body?.cedulaRif === 'string' ? req.body.cedulaRif.trim() : null
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const telefono = typeof req.body?.telefono === 'string' ? req.body.telefono.trim() : null

    if (!nombreCompleto || !email) {
      res.status(400).json({ success: false, message: 'nombreCompleto y email son requeridos' })
      return
    }

    // validar curso abierto y cupos
    const cursoRes = await db.execute({
      sql: `SELECT id_curso, cupos_disponibles, estatus FROM cursos WHERE id_curso = ? LIMIT 1`,
      args: [idCurso],
    })
    const curso = cursoRes.rows[0] as any
    if (!curso) {
      res.status(404).json({ success: false, message: 'Curso no encontrado' })
      return
    }
    if (curso.estatus !== 'Abierto') {
      res.status(400).json({ success: false, message: 'El curso no está abierto' })
      return
    }
    if ((curso.cupos_disponibles as number) <= 0) {
      res.status(400).json({ success: false, message: 'No hay cupos disponibles' })
      return
    }

    const { id_estudiante } = await upsertEstudianteByEmail({
      nombreCompleto,
      cedulaRif,
      email,
      telefono,
      tipo: 'Regular',
    })

    const now = new Date().toISOString()

    await db.batch(
      [
        {
          sql: `INSERT INTO inscripciones_cursos (id_estudiante, id_curso, estatus, asignado_por, aprobado_por, creado_en, actualizado_en)
                VALUES (?, ?, 'Inscrito', ?, ?, ?, ?)
                ON CONFLICT DO UPDATE SET
                  estatus='Inscrito',
                  asignado_por=excluded.asignado_por,
                  aprobado_por=excluded.aprobado_por,
                  actualizado_en=excluded.actualizado_en`,
          args: [id_estudiante, idCurso, req.user?.id ?? null, req.user?.id ?? null, now, now],
        },
        {
          sql: `UPDATE cursos SET cupos_disponibles = cupos_disponibles - 1
                WHERE id_curso = ? AND cupos_disponibles > 0`,
          args: [idCurso],
        },
      ],
      'write'
    )

    res.status(201).json({ success: true, message: 'Estudiante asignado e inscrito en el curso.' })
  } catch (error) {
    console.error('adminAsignarEstudianteACurso:', error)
    res.status(500).json({ success: false, message: 'Error al asignar estudiante' })
  }
}

/**
 * PATCH /api/academia/inscripciones/:id/aprobar
 * Aprueba una preinscripción (la marca como Inscrito). Si no tiene curso asignado, solo cambia estatus.
 */
export const adminAprobarPreinscripcion = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    if (!Number.isFinite(id)) {
      res.status(400).json({ success: false, message: 'id inválido' })
      return
    }

    const now = new Date().toISOString()
    const result = await db.execute({
      sql: `UPDATE inscripciones_cursos
            SET estatus='Inscrito', aprobado_por=?, actualizado_en=?
            WHERE id_inscripcion=? AND estatus='Preinscrito'
            RETURNING *`,
      args: [req.user?.id ?? null, now, id],
    })

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Preinscripción no encontrada o ya procesada' })
      return
    }

    res.json({ success: true, message: 'Preinscripción aprobada.', data: result.rows[0] })
  } catch (error) {
    console.error('adminAprobarPreinscripcion:', error)
    res.status(500).json({ success: false, message: 'Error al aprobar preinscripción' })
  }
}

/**
 * PATCH /api/academia/inscripciones/:id/rechazar
 */
export const adminRechazarPreinscripcion = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    if (!Number.isFinite(id)) {
      res.status(400).json({ success: false, message: 'id inválido' })
      return
    }
    const notaAdmin = typeof req.body?.notaAdmin === 'string' ? req.body.notaAdmin.trim() : null
    const now = new Date().toISOString()

    const result = await db.execute({
      sql: `UPDATE inscripciones_cursos
            SET estatus='Rechazado', nota_admin=COALESCE(?, nota_admin), aprobado_por=?, actualizado_en=?
            WHERE id_inscripcion=? AND estatus='Preinscrito'
            RETURNING *`,
      args: [notaAdmin, req.user?.id ?? null, now, id],
    })
    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Preinscripción no encontrada o ya procesada' })
      return
    }
    res.json({ success: true, message: 'Preinscripción rechazada.', data: result.rows[0] })
  } catch (error) {
    console.error('adminRechazarPreinscripcion:', error)
    res.status(500).json({ success: false, message: 'Error al rechazar preinscripción' })
  }
}

/**
 * GET /api/academia/estudiantes?query=
 * Lista estudiantes (admin). Pensado para panel "Estudiantes Regulares".
 */
export const adminListEstudiantes = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = typeof req.query?.query === 'string' ? req.query.query.trim().toLowerCase() : ''

    const where = query
      ? `WHERE (lower(nombre_completo) LIKE ? OR lower(email) LIKE ? OR lower(COALESCE(cedula_rif,'')) LIKE ?)`
      : ''
    const args = query ? [`%${query}%`, `%${query}%`, `%${query}%`] : []

    const result = await db.execute({
      sql: `
        SELECT id_estudiante, id_agremiado, cedula_rif, nombre_completo, email, telefono, tipo, creado_en, actualizado_en
        FROM estudiantes
        ${where}
        ORDER BY creado_en DESC
        LIMIT 250
      `,
      args,
    })

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('adminListEstudiantes:', error)
    res.status(500).json({ success: false, message: 'Error al obtener estudiantes' })
  }
}

/**
 * GET /api/academia/estudiantes/:id
 * Devuelve estudiante + sus inscripciones (programa o curso).
 */
export const adminGetEstudiante = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    if (!Number.isFinite(id)) {
      res.status(400).json({ success: false, message: 'id inválido' })
      return
    }

    const est = await db.execute({
      sql: `SELECT * FROM estudiantes WHERE id_estudiante = ? LIMIT 1`,
      args: [id],
    })
    if (est.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Estudiante no encontrado' })
      return
    }

    const insc = await db.execute({
      sql: `
        SELECT
          ic.*,
          c.nombre as curso_nombre,
          c.estatus as curso_estatus
        FROM inscripciones_cursos ic
        LEFT JOIN cursos c ON c.id_curso = ic.id_curso
        WHERE ic.id_estudiante = ?
        ORDER BY ic.creado_en DESC
      `,
      args: [id],
    })

    res.json({ success: true, data: { estudiante: est.rows[0], inscripciones: insc.rows } })
  } catch (error) {
    console.error('adminGetEstudiante:', error)
    res.status(500).json({ success: false, message: 'Error al obtener estudiante' })
  }
}

/**
 * Helpers re-exported to keep route files small.
 */
export const academiaAdminGuards = [requireAuth, requireRole('admin', 'super_admin')] as const

