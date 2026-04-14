import React, { useEffect, useMemo, useState } from 'react'
import { API_URL } from '@/config/env'
import { useAuth } from '@/context/AuthContext'

type EstatusAgremiado = 'Preinscrito' | 'CIBIR' | 'Moroso' | 'Suspendido' | 'Rechazado'

type Agremiado = {
  id_agremiado: number
  codigo_cibir: string | null
  cedula_rif: string
  nombre_completo: string
  email: string
  telefono: string | null
  estatus: EstatusAgremiado
  inscripcion_pagada: number
  fecha_registro: string
  fecha_ultimo_cambio_estatus: string | null
}

export default function AfiliadosPanel() {
  const { token } = useAuth()
  const authHeaders = useMemo(() => {
    const h: Record<string, string> = {}
    if (token) h.Authorization = `Bearer ${token}`
    return h
  }, [token])

  const [estatus, setEstatus] = useState<'Todos' | EstatusAgremiado>('Todos')
  const [items, setItems] = useState<Agremiado[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Agremiado | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const qs = new URLSearchParams()
      if (estatus !== 'Todos') qs.set('estatus', estatus)
      const res = await fetch(`${API_URL}/api/afiliados?${qs.toString()}`, { headers: authHeaders })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Error cargando afiliados')
      setItems(json.data as Agremiado[])
    } catch (e: unknown) {
      const err = e as Error
      setError(err.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const loadDetail = async (id: number) => {
    setDetailLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/afiliados/${id}`, { headers: authHeaders })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Error cargando detalle')
      setSelected(json.data as Agremiado)
    } catch (e: unknown) {
      const err = e as Error
      setError(err.message || 'Error inesperado')
    } finally {
      setDetailLoading(false)
    }
  }

  useEffect(() => { load() }, []) // initial
  useEffect(() => { load() }, [estatus]) // reload on filter

  const procesar = async (id: number, action: 'aprobar' | 'rechazar') => {
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/afiliados/${id}/${action}`, { method: 'PATCH', headers: authHeaders })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'No se pudo procesar')
      await load()
      await loadDetail(id)
    } catch (e: unknown) {
      const err = e as Error
      setError(err.message || 'Error inesperado')
    }
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* List */}
      <div className="flex flex-col bg-white border-r border-gray-100 overflow-hidden w-full sm:w-[360px] flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-slate-800">Afiliados / Agremiados (CIBIR)</h3>
          <p className="text-xs text-slate-400 mt-0.5">Gestión de candidatos, aprobaciones y estatus.</p>
          <div className="mt-3 flex gap-2">
            <select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value as any)}
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm text-slate-700"
            >
              <option value="Todos">Todos</option>
              <option value="Preinscrito">Preinscrito</option>
              <option value="CIBIR">CIBIR</option>
              <option value="Moroso">Moroso</option>
              <option value="Suspendido">Suspendido</option>
              <option value="Rechazado">Rechazado</option>
            </select>
            <button
              onClick={load}
              className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              Refrescar
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {loading ? (
            <div className="p-4 text-center text-xs text-slate-400 font-semibold uppercase tracking-widest mt-10">Cargando...</div>
          ) : error ? (
            <div className="p-4 text-center text-xs text-red-500 mt-10">{error}</div>
          ) : items.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400 mt-10">Sin resultados.</div>
          ) : (
            items.map(a => (
              <button
                key={a.id_agremiado}
                onClick={() => loadDetail(a.id_agremiado)}
                className={['w-full text-left px-4 py-3.5 transition-colors flex flex-col gap-1',
                  selected?.id_agremiado === a.id_agremiado ? 'bg-[#E9FAF4]' : 'hover:bg-slate-50',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold truncate text-slate-800">{a.nombre_completo}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {a.estatus}
                  </span>
                </div>
                <span className="text-xs text-slate-400 truncate">{a.email}</span>
                <span className="text-[10px] text-slate-300">
                  #{a.id_agremiado} · {a.codigo_cibir || 'sin código'} · {new Date(a.fecha_registro).toLocaleDateString('es-ES')}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 min-w-0 bg-gray-50 hidden sm:flex sm:flex-col">
        {!selected ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-300">
            <p className="text-sm font-medium">Selecciona un afiliado</p>
          </div>
        ) : detailLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-300">
            <p className="text-sm font-medium">Cargando detalle...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4 sm:p-6 overflow-y-auto h-full">
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{selected.nombre_completo}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{selected.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{selected.telefono || 'Teléfono: —'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">
                    {selected.estatus}
                  </span>
                  {selected.codigo_cibir && (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700">
                      {selected.codigo_cibir}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Cédula/RIF</span>
                <span className="text-sm text-slate-700 font-medium break-all">{selected.cedula_rif}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Inscripción pagada</span>
                <span className="text-sm text-slate-700 font-medium">{selected.inscripcion_pagada ? 'Sí' : 'No'}</span>
              </div>
            </div>

            {selected.estatus === 'Preinscrito' && (
              <div className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-2">
                <button
                  onClick={() => procesar(selected.id_agremiado, 'aprobar')}
                  className="flex-1 py-2.5 rounded-xl bg-[#00D084] text-white text-sm font-semibold hover:bg-[#00B870] transition-colors"
                >
                  ✓ Aprobar (CIBIR)
                </button>
                <button
                  onClick={() => procesar(selected.id_agremiado, 'rechazar')}
                  className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                  ✗ Rechazar
                </button>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-2xl p-4">{error}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

