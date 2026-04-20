import React, { useState } from 'react'
import { User, Mail, CheckCircle2, Loader2, AlertCircle, Hash, ChevronDown } from 'lucide-react'
import { API_URL } from '@/config/env'

type ProgramaCodigo = 'PADI' | 'PEGI' | 'PREANI' | 'CIBIR' | 'AFILIACION'

interface Props {
  programaCodigo: ProgramaCodigo
  ctaLabel?: string
  initialData?: Partial<{
    nombreCompleto: string
    email: string
    telefono: string
    cedulaRif: string
    nivelProfesional: string
    esCorredorInmobiliario: boolean
  }>
}

const COUNTRIES = [
  { code: '+58', flag: '🇻🇪', label: 'Venezuela' },
  { code: '+57', flag: '🇨🇴', label: 'Colombia' },
  { code: '+34', flag: '🇪🇸', label: 'España' },
  { code: '+1',  flag: '🇺🇸', label: 'Estados Unidos' },
  { code: '+507',flag: '🇵🇦', label: 'Panamá' },
  { code: '+52', flag: '🇲🇽', label: 'México' },
  { code: '+54', flag: '🇦🇷', label: 'Argentina' },
  { code: '+56', flag: '🇨🇱', label: 'Chile' },
  { code: '+51', flag: '🇵🇪', label: 'Perú' },
  { code: '+593',flag: '🇪🇨', label: 'Ecuador' },
  { code: '+1',  flag: '🇩🇴', label: 'Rep. Dominicana' },
  { code: '+506',flag: '🇨🇷', label: 'Costa Rica' },
  { code: '+502',flag: '🇬🇹', label: 'Guatemala' },
  { code: '+504',flag: '🇭🇳', label: 'Honduras' },
  { code: '+503',flag: '🇸🇻', label: 'El Salvador' },
  { code: '+505',flag: '🇳🇮', label: 'Nicaragua' },
  { code: '+595',flag: '🇵🇾', label: 'Paraguay' },
  { code: '+598',flag: '🇺🇾', label: 'Uruguay' },
  { code: '+591',flag: '🇧🇴', label: 'Bolivia' },
  { code: '+1',  flag: '🇵🇷', label: 'Puerto Rico' },
]

export default function PreinscripcionProgramaForm({ programaCodigo, ctaLabel, initialData }: Props) {
  // Función para extraer el prefijo del país del teléfono (ej: +58424... -> +58)
  const extractPhone = (phone: string | undefined) => {
    if (!phone) return { prefix: '+58', number: '' }
    const country = COUNTRIES.find(c => phone.startsWith(c.code))
    if (country) {
      return { prefix: country.code, number: phone.slice(country.code.length) }
    }
    return { prefix: '+58', number: phone }
  }

  const phoneData = extractPhone(initialData?.telefono)

  const [formData, setFormData] = useState({
    nombreCompleto: initialData?.nombreCompleto || '',
    cedulaPrefix: initialData?.cedulaRif?.includes('-') ? initialData.cedulaRif.split('-')[0] : 'V',
    cedulaNumber: initialData?.cedulaRif?.includes('-') ? initialData.cedulaRif.split('-')[1] : (initialData?.cedulaRif || ''),
    email: initialData?.email || '',
    phonePrefix: phoneData.prefix,
    telefono: phoneData.number,
    nivelProfesional: initialData?.nivelProfesional || '',
    esCorredorInmobiliario: initialData?.esCorredorInmobiliario === true ? 'si' : initialData?.esCorredorInmobiliario === false ? 'no' : '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    // --- VALIDACIONES ---
    const nombreTrim = formData.nombreCompleto.trim()
    if (nombreTrim.length < 5 || !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(nombreTrim)) {
      setErrorMsg('Por favor, ingresa un nombre completo válido (solo letras).')
      return
    }

    const cedulaNum = formData.cedulaNumber.replace(/\D/g, '')
    if (cedulaNum.length < 6 || cedulaNum.length > 12) {
      setErrorMsg('El número de identificación debe tener entre 6 y 12 dígitos.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg('Por favor, ingresa un correo electrónico válido.')
      return
    }

    const phoneNum = formData.telefono.replace(/\D/g, '')
    if (phoneNum.length < 7 || phoneNum.length > 15) {
      setErrorMsg('Por favor, ingresa un número de teléfono válido.')
      return
    }

    setLoading(true)
    
    const cedulaRif = `${formData.cedulaPrefix}-${cedulaNum}`
    const phone = `${formData.phonePrefix}${phoneNum}`

    try {
      const res = await fetch(`${API_URL}/api/public/preinscripciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programaCodigo,
          nombreCompleto: nombreTrim,
          cedulaRif,
          email: formData.email,
          telefono: phone,
          nivelProfesional: formData.nivelProfesional,
          esCorredorInmobiliario: formData.esCorredorInmobiliario === 'si',
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'No se pudo registrar la preinscripción')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      const e = err as Error
      setErrorMsg(e.message || 'Ocurrió un error inesperado.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-10 flex flex-col items-center text-center space-y-5">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-50">
          <CheckCircle2 size={34} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-black text-white">¡Revisa tu correo!</h3>
        <p className="text-sm max-w-md leading-relaxed text-emerald-100/85">
          Te enviamos un enlace de confirmación para validar tu email y completar la preinscripción al programa <span className="font-bold">{programaCodigo}</span>.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold underline transition-colors text-emerald-300 hover:text-emerald-200"
        >
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre Completo */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-emerald-100/90">
            Nombre Completo
          </label>
          <div className="group relative">
            <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              name="nombreCompleto"
              required
              value={formData.nombreCompleto}
              onChange={handleChange}
              placeholder="Ej. Carlos Mendoza"
              className="w-full pl-12 pr-5 py-4 bg-white rounded-xl outline-none transition-all placeholder:text-slate-300 font-medium text-sm border border-slate-200 text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
            />
          </div>
        </div>

        {/* Cédula de Identidad o RIF */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-emerald-100/90">
            Cédula de Identidad o RIF
          </label>
          <div className="flex gap-0 group focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-xl transition-all shadow-sm">
            <div className="relative flex-shrink-0">
              <select
                name="cedulaPrefix"
                value={formData.cedulaPrefix}
                onChange={handleChange}
                className="h-full pl-4 pr-9 bg-slate-50 border-y border-l border-slate-200 rounded-l-xl outline-none transition-all font-bold text-sm text-slate-700 hover:bg-slate-100 appearance-none cursor-pointer"
              >
                {['V', 'E', 'J', 'G', 'P'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <div className="relative flex-1">
              <Hash size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                name="cedulaNumber"
                required
                value={formData.cedulaNumber}
                onChange={handleChange}
                placeholder="00000000"
                className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-r-xl outline-none transition-all placeholder:text-slate-300 font-medium text-sm text-slate-800 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Correo Electrónico */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-emerald-100/90">
            Correo Electrónico
          </label>
          <div className="group relative">
            <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@ejemplo.com"
              className="w-full pl-12 pr-5 py-4 bg-white rounded-xl outline-none transition-all placeholder:text-slate-300 font-medium text-sm border border-slate-200 text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
            />
          </div>
        </div>

        {/* Teléfono de Contacto */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-emerald-100/90">
            Teléfono de Contacto
          </label>
          <div className="flex gap-0 group focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-xl transition-all shadow-sm">
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="h-full pl-4 pr-9 bg-slate-50 border-y border-l border-slate-200 rounded-l-xl outline-none transition-all font-bold text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2 min-w-[100px]"
              >
                <span className="text-lg">{COUNTRIES.find(c => c.code === formData.phonePrefix)?.flag}</span>
                <span>{formData.phonePrefix}</span>
                <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCountryDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowCountryDropdown(false)}
                  />
                  <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-48 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-slate-200">
                      {COUNTRIES.map(c => (
                        <button
                          key={`${c.label}-${c.code}`}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, phonePrefix: c.code }));
                            setShowCountryDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-emerald-50 transition-colors ${formData.phonePrefix === c.code ? 'bg-emerald-50/50' : ''}`}
                        >
                          <span className="text-xl">{c.flag}</span>
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{c.label}</span>
                            <span className="text-xs font-bold text-emerald-600">{c.code}</span>
                          </div>
                          {formData.phonePrefix === c.code && (
                            <CheckCircle2 size={14} className="ml-auto text-emerald-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative flex-1">
              <input
                type="tel"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                placeholder="4XX 0000000"
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-r-xl outline-none transition-all placeholder:text-slate-300 font-medium text-sm text-slate-800 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-emerald-100/90">
            Nivel Profesional
          </label>
          <div className="relative group">
            <select
              name="nivelProfesional"
              required
              value={formData.nivelProfesional}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white rounded-xl outline-none transition-all font-medium text-sm border border-slate-200 text-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 appearance-none shadow-sm"
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="Bachiller">Bachiller</option>
              <option value="Universitario">Universitario</option>
              <option value="Postgrado">Postgrado</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-emerald-100/90">
            ¿Ya eres corredor inmobiliario?
          </label>
          <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <div className="grid grid-cols-2 gap-1" role="radiogroup" aria-label="¿Ya eres corredor inmobiliario?">
              {[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' },
              ].map(option => {
                const selected = formData.esCorredorInmobiliario === option.value
                return (
                  <label
                    key={option.value}
                    className={[
                      'h-[50px] rounded-lg cursor-pointer text-sm font-semibold flex items-center justify-center transition-all',
                      selected
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="esCorredorInmobiliario"
                      value={option.value}
                      checked={selected}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    <span>{option.label}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full font-black py-5 rounded-xl flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-xs shadow-xl bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-[#022c22]"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : (ctaLabel ?? 'Preinscribirme')}
      </button>

      {errorMsg && (
        <div className="flex items-center gap-2 text-red-100 bg-red-500/20 border border-red-400/40 p-3 rounded-xl text-xs font-bold justify-center">
          <AlertCircle size={14} />
          <span>{errorMsg}</span>
        </div>
      )}

      <p className="text-[10px] text-center uppercase tracking-[0.15em] font-bold text-emerald-100/80">
        Esta solicitud no habilita módulos de estudio; solo registra la preinscripción y la futura certificación.
      </p>
    </form>
  )
}
