import PreinscripcionProgramaForm from '@/pages/landing/components/PreinscripcionProgramaForm'

const PreaniPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Programa</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">PREANI</h1>
          <p className="text-sm text-slate-500">
            Programa de Estudios Académicos Inmobiliarios Nivel Inicial. Acceso público bajo modalidad de <span className="font-bold">Preinscripción</span>.
          </p>
        </div>

        <div id="inscripcion" className="rounded-[2.5rem] p-8 md:p-14 border border-slate-200 bg-white shadow-sm">
          <PreinscripcionProgramaForm programaCodigo="PREANI" ctaLabel="Preinscribirme a PREANI" />
        </div>
      </div>
    </div>
  )
}

export default PreaniPage