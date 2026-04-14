import React, { useEffect, useMemo, useState } from 'react'
import { API_URL } from '@/config/env'
import { useAuth } from '@/context/AuthContext'

type ProgramaCodigo = 'PADI' | 'PEGI' | 'PREANI' | 'CIBIR'
type Estatus = 'Preinscrito' | 'Inscrito' | 'Rechazado' | 'Cancelado'

type Row = {
  id_inscripcion: number
  programa_codigo: ProgramaCodigo
  estatus: Estatus
  creado_en: string
  estudiante_nombre: string
  estudiante_email: string
  estudiante_telefono: string | null
  estudiante_cedula_rif: string | null
}

export default function PreinscripcionesPrincipalesPanel() {
  const { token } = useAuth()
  const [programa, setPrograma] = useState<ProgramaCodigo | 'Todos'>('Todos')
  const [estatus, setEstatus] = useState<Estatus>('Preinscrito')
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Row | null>(null)

  const authHeaders = useMemo(() => {
    const h: Record<string, string> = {}
    if (token) h.Authorization = `Bearer ${token}`
    return h
  }, [token])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const qs = new URLSearchParams()
      qs.set('estatus', estatus)
      if (programa !== 'Todos') qs.set('programaCodigo', programa)

      const res = await fetch(`${API_URL}/api/academia/preinscripciones?${qs.toString()}`, {
        headers: { ...authHeaders },
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Error cargando preinscripciones')
      setRows(json.data as Row[])
      setSelected(null)
    } catch (e: unknown) {
      const err = e as Error
      setError(err.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programa, estatus, token])

  const procesar = async (id: number, action: 'aprobar' | 'rechazar') => {
    try {
      const res = await fetch(`${API_URL}/api/academia/inscripciones/${id}/${action}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: action === 'rechazar' ? JSON.stringify({ notaAdmin: '' }) : undefined,
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'No se pudo procesar')
      await fetchData()
    } catch (e: unknown) {
      const err = e as Error
      setError(err.message || 'Error inesperado')
    }
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* List */}
      <div className="flex flex-col bg-white border-r border-gray-100 overflow-hidden w-full sm:w-[340px] flex-shrink-0">
        <div className="px-3 py-3 border-b border-gray-100 flex flex-wrap gap-2">
          <select
            value={programa}
            onChange={(e) => setPrograma(e.target.value as any)}
            className="text-xs rounded-xl border border-gray-200 px-2.5 py-2 text-slate-700"
          >
            <option value="Todos">Todos</option>
            <option value="PADI">PADI</option>
            <option value="PEGI">PEGI</option>
            <option value="PREANI">PREANI</option>
            <option value="CIBIR">CIBIR</option>
          </select>
          <select
            value={estatus}
            onChange={(e) => setEstatus(e.target.value as Estatus)}
            className="text-xs rounded-xl border border-gray-200 px-2.5 py-2 text-slate-700"
          >
            <option value="Preinscrito">Preinscrito</option>
            <option value="Inscrito">Inscrito</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button
            onClick={fetchData}
            className="ml-auto text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Refrescar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {loading ? (
            <div className="p-4 text-center text-xs text-slate-400 font-semibold uppercase tracking-widest mt-10">Cargando...</div>
          ) : error ? (
            <div className="p-4 text-center text-xs text-red-500 mt-10">{error}</div>
          ) : rows.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400 mt-10">No hay registros.</div>
          ) : (
            rows.map(r => (
              <button
                key={r.id_inscripcion}
                onClick={() => setSelected(r)}
                className={['w-full text-left px-4 py-3.5 transition-colors flex flex-col gap-1',
                  selected?.id_inscripcion === r.id_inscripcion ? 'bg-[#E9FAF4]' : 'hover:bg-slate-50',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold truncate text-slate-800">{r.estudiante_nombre}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {r.programa_codigo}
                  </span>
                </div>
                <span className="text-xs text-slate-400 truncate">{r.estudiante_email}</span>
                <span className="text-[10px] text-slate-300">{new Date(r.creado_en).toLocaleString('es-ES')}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 min-w-0 bg-gray-50 hidden sm:flex sm:flex-col">
        {selected ? (
          <div className="flex flex-col gap-4 p-4 sm:p-6 overflow-y-auto h-full">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{selected.estudiante_nombre}</h3>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{selected.estudiante_email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">
                  {selected.programa_codigo}
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-600">
                  {selected.estatus}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Cédula/RIF</span>
                <span className="text-sm text-slate-700 font-medium break-all">{selected.estudiante_cedula_rif || 'No indicado'}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Teléfono</span>
                <span className="text-sm text-slate-700 font-medium break-all">{selected.estudiante_telefono || 'No indicado'}</span>
              </div>
            </div>

            {selected.estatus === 'Preinscrito' && (
              <div className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-2">
                <button
                  onClick={() => procesar(selected.id_inscripcion, 'aprobar')}
                  className="flex-1 py-2.5 rounded-xl bg-[#00D084] text-white text-sm font-semibold hover:bg-[#00B870] transition-colors"
                >
                  ✓ Aprobar
                </button>
                <button
                  onClick={() => procesar(selected.id_inscripcion, 'rechazar')}
                  className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                  ✗ Rechazar
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-300">
            <p className="text-sm font-medium">Selecciona una preinscripción</p>
          </div>
        )}
      </div>
    </div>
  )
}

