import React, { useState, useEffect, useCallback } from 'react'
import { api, FormField, Input, Textarea, BtnPrimary, BtnDanger, BtnSecondary, ListDetail, uploadFileSupabase } from '@/pages/admin/components/Cms/CmsShared'

interface NormativaItem {
  id: string | number
  titulo: string
  descripcion: string | null
  url_documento: string
  categoria: string | null
  orden: number
  activo: boolean | number
}

export const NormativasPanel = ({ fixedCategory }: { fixedCategory?: string }) => {
  const [items, setItems] = useState<NormativaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | number | null>(null)
  const [activeTab, setActiveTab] = useState<string>(fixedCategory || 'Todas')
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    url_documento: '',
    categoria: fixedCategory || '',
    orden: 0,
    activo: true,
  })
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const tabs = ['Todas', 'Leyes y Decretos', 'Reglamentos y Estatutos', 'Normas y Procedimientos', 'Actas de Asamblea', 'Otros']

  const load = useCallback(async () => {
    setLoading(true)
    const data = await api.get('/api/cms/normativas')
    if (data.success) setItems(data.data as NormativaItem[])
    setLoading(false)
  }, [])
  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (fixedCategory) {
      setActiveTab(fixedCategory)
      setForm(p => ({ ...p, categoria: fixedCategory }))
      setSelectedId(null)
      setIsEditing(false)
    }
  }, [fixedCategory])

  const openEdit = (item: NormativaItem) => {
    setSelectedId(item.id)
    setForm({
      titulo: item.titulo,
      descripcion: item.descripcion ?? '',
      url_documento: item.url_documento,
      categoria: item.categoria ?? '',
      orden: item.orden,
      activo: item.activo === 1 || item.activo === true,
    })
    setIsEditing(true)
  }
  const openNew = () => {
    setSelectedId('new')
    setForm({ 
      titulo: '', 
      descripcion: '', 
      url_documento: '', 
      categoria: fixedCategory || (activeTab !== 'Todas' ? activeTab : ''), 
      orden: 0, 
      activo: true 
    })
    setIsEditing(true)
  }
  const save = async () => {
    setSaving(true)
    if (selectedId === 'new') await api.post('/api/cms/normativas', form)
    else await api.put(`/api/cms/normativas/${selectedId}`, form)
    setSaving(false)
    setSelectedId(null)
    setIsEditing(false)
    load()
  }
  const remove = async (id: string | number) => {
    if (!confirm('¿Eliminar este documento legal?')) return
    await api.delete(`/api/cms/normativas/${id}`)
    setSelectedId(null)
    load()
  }
  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({
      ...p,
      [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.type === 'number' ? Number(e.target.value) : e.target.value,
    }))

  const uploadFile = async (file: File) => {
    setUploadError(null)
    setUploading(true)
    try {
      const publicUrl = await uploadFileSupabase(file, 'normativas')
      setForm((p) => ({ ...p, url_documento: publicUrl }))
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Error al subir archivo')
    } finally {
      setUploading(false)
    }
  }

  const filteredItems = activeTab === 'Todas' ? items : items.filter(it => it.categoria === activeTab)

  const formBody = () => (
    <div className="flex flex-col gap-4 bg-white rounded-2xl p-5 border border-gray-100 max-h-[calc(100vh-160px)] overflow-y-auto">
      <h3 className="text-sm font-bold text-slate-800">{selectedId === 'new' ? 'Nuevo documento legal' : 'Editar documento legal'}</h3>
      <FormField label="Título">
        <Input value={form.titulo} onChange={f('titulo')} placeholder="Ej. Ley de Arrendamiento Inmobiliario" />
      </FormField>
      <FormField label="Descripción (opcional)">
        <Textarea value={form.descripcion} onChange={f('descripcion')} placeholder="Breve resumen para la web" rows={3} />
      </FormField>
      <FormField label="Documento (subida directa)">
        <Input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) uploadFile(file)
          }}
          disabled={uploading}
        />
      </FormField>
      {uploadError && <p className="text-[11px] text-red-600 -mt-2">{uploadError}</p>}
      <p className="text-[10px] text-slate-400 leading-relaxed -mt-2">
        Al seleccionar un archivo, se sube directo y se completa automáticamente el documento (sólo un archivo asocidado).
      </p>
      {form.url_documento && (
        <a href={form.url_documento} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline break-all">
          Ver documento actual
        </a>
      )}
      <FormField label="Categoría">
        <select 
          value={form.categoria} 
          onChange={(e) => setForm(p => ({ ...p, categoria: e.target.value }))}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        >
          <option value="">Seleccionar categoría...</option>
          <option value="Leyes y Decretos">Leyes y Decretos</option>
          <option value="Reglamentos y Estatutos">Reglamentos y Estatutos</option>
          <option value="Normas y Procedimientos">Normas y Procedimientos</option>
          <option value="Actas de Asamblea">Actas de Asamblea</option>
          <option value="Otros">Otros</option>
        </select>
      </FormField>
      <FormField label="Orden">
        <Input type="number" value={form.orden} onChange={f('orden')} />
      </FormField>
      <label className="flex items-center gap-2 text-xs text-slate-600">
        <input type="checkbox" checked={form.activo} onChange={(e) => setForm((p) => ({ ...p, activo: e.target.checked }))} />
        Visible en la web pública
      </label>
      <div className="flex gap-2 pt-2">
        <BtnPrimary onClick={save} disabled={saving || uploading}>
          {uploading ? 'Subiendo...' : saving ? 'Guardando...' : 'Guardar'}
        </BtnPrimary>
        <BtnSecondary
          onClick={() => {
            setSelectedId(null)
            setIsEditing(false)
          }}
        >
          Cancelar
        </BtnSecondary>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      {!fixedCategory && (
        <div className="flex-shrink-0 px-4 pt-4 bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
          <div className="flex gap-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setSelectedId(null)
                }}
                className={[
                  'pb-3 text-[11px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap',
                  activeTab === tab ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                ].join(' ')}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <ListDetail
          items={filteredItems}
          loading={loading}
          selectedId={selectedId}
          setSelectedId={(id) => {
            setSelectedId(id)
            setIsEditing(false)
          }}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onNew={openNew}
          renderRow={(item, sel) => (
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg shrink-0" aria-hidden>
                📄
              </span>
              <div className="flex flex-col min-w-0">
                <span className={['text-sm font-semibold truncate', sel ? 'text-[#00B870]' : 'text-slate-800'].join(' ')}>{item.titulo}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{item.categoria || 'Sin categoría'}</span>
              </div>
            </div>
          )}
          renderDetail={(item) => (
            <div className="flex flex-col gap-4 bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-800">{item.titulo}</h3>
                <div className="flex gap-2 shrink-0">
                  <BtnSecondary onClick={() => openEdit(item)}>Editar</BtnSecondary>
                  <BtnDanger onClick={() => remove(item.id)}>Eliminar</BtnDanger>
                </div>
              </div>
              {item.descripcion && <p className="text-xs text-slate-600">{item.descripcion}</p>}
              {item.categoria && (
                <span className="inline-block text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg w-fit">{item.categoria}</span>
              )}
              <a
                href={item.url_documento}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline break-all"
              >
                {item.url_documento}
              </a>
              <p className="text-xs text-slate-400">Orden: {item.orden} · {item.activo === 1 || item.activo === true ? 'Activo' : 'Oculto'}</p>
            </div>
          )}
          renderForm={formBody}
        />
      </div>
    </div>
  )
}
