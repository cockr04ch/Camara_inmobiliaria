import { Router } from 'express'
import {
  adminAsignarEstudianteACurso,
  adminAprobarPreinscripcion,
  adminGetEstudiante,
  adminListCursos,
  adminListEstudiantes,
  adminListPreinscripciones,
  adminRechazarPreinscripcion,
  academiaAdminGuards,
} from '../controllers/academia.controller.js'

const router = Router()

// Todo lo de este router es para panel administrativo
router.use(...academiaAdminGuards)

// GET /api/academia/cursos?estatus=Abierto
router.get('/cursos', adminListCursos)

// GET /api/academia/preinscripciones?programaCodigo=PADI&estatus=Preinscrito
router.get('/preinscripciones', adminListPreinscripciones)

// GET /api/academia/estudiantes?query=
router.get('/estudiantes', adminListEstudiantes)

// GET /api/academia/estudiantes/:id
router.get('/estudiantes/:id', adminGetEstudiante)

// POST /api/academia/cursos/:id_curso/asignar
router.post('/cursos/:id_curso/asignar', adminAsignarEstudianteACurso)

// PATCH /api/academia/inscripciones/:id/aprobar
router.patch('/inscripciones/:id/aprobar', adminAprobarPreinscripcion)

// PATCH /api/academia/inscripciones/:id/rechazar
router.patch('/inscripciones/:id/rechazar', adminRechazarPreinscripcion)

export { router as academiaRoutes }

