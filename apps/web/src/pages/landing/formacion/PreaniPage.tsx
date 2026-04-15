import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgPreani from "../assets/Pzo.jpg"; 
import logoPreani from "../assets/Preani.jpg"; 
import Navbar from '@/pages/landing/components/navbar/Navbar';
import Estudiosa from "../assets/estudiosa1.png"; 
import Estudioso from "../assets/estudioso1.png";

// --- INTERFACES ---
interface ModuloProps {
  numero: string;
  titulo: string;
  descripcion: string;
  index: number;
}

// --- HOOKS ---
const useScrollReveal = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return setRef;
};

// --- COMPONENTES ---

const ModuloPreani: React.FC<ModuloProps> = ({ numero, titulo, descripcion, index }) => {
  const setReveal = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={(el) => setReveal(el)} 
      className="reveal-on-scroll relative mb-16 md:mb-20 flex flex-col md:flex-row items-center"
    >
      {/* Indicador de Módulo con Diseño Premium */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-12 h-12 rounded-xl bg-emerald-500 items-center justify-center z-20 shadow-lg border-2 border-white text-white font-black">
        {numero}
      </div>
      
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:order-last text-left'}`}>
        <h4 className="text-2xl font-black text-[#022c22] mb-3 uppercase tracking-tight">
          {titulo}
        </h4>
        <p className="text-slate-600 leading-relaxed text-lg italic">
          {descripcion}
        </p>
      </div>
      
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

export default function Preani() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const setRevealEstudiosa = useScrollReveal(); 
  const setRevealEstudioso = useScrollReveal(); 

  // Datos extendidos para mantener la densidad de código
  const modulos: Omit<ModuloProps, "index">[] = [
    { 
      numero: "01", 
      titulo: "Formación Fundamental", 
      descripcion: "Bases sólidas para entender el entorno y la dinámica del negocio inmobiliario moderno, analizando tendencias globales y locales." 
    },
    { 
      numero: "02", 
      titulo: "Herramientas de Cálculo", 
      descripcion: "Aplicación de matemáticas financieras, análisis cuantitativo y proyecciones de rentabilidad para la toma de decisiones estratégicas." 
    },
    { 
      numero: "03", 
      titulo: "Marco Legal Inmobiliario", 
      descripcion: "Análisis profundo de la legislación venezolana aplicada a la propiedad, transacciones complejas y derecho registral/notarial." 
    },
    { 
      numero: "04", 
      titulo: "Ventas y Comercialización", 
      descripcion: "Estrategias avanzadas de marketing de alto impacto, neuromarketing y técnicas de negociación efectiva en el sector de lujo y comercial." 
    },
    { 
      numero: "05", 
      titulo: "Gestión Empresarial", 
      descripcion: "Administración eficiente de carteras, liderazgo de equipos de alto desempeño y planificación estratégica para empresas inmobiliarias." 
    },
    { 
      numero: "06", 
      titulo: "Certificación Final", 
      descripcion: "Proceso integral de evaluación, defensa de proyecto y acreditación oficial como Profesional Inmobiliario certificado por el gremio." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 scroll-smooth">
      <Navbar/>

      {/* HEADER CON ANIMACIÓN INTACTA */}
      <header
        className="relative px-6 lg:px-20 py-20 lg:py-32 flex items-center justify-center min-h-[55vh] bg-cover animate-header-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 44, 34, 0.8), rgba(2, 44, 34, 0.9)), url(${bgPreani})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center space-y-6 max-w-4xl">
          <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs animate-header-text" style={{ animationDelay: "0.2s", opacity: 0 }}>
            Especialización Profesional Avanzada
          </p>
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter animate-header-text" style={{ animationDelay: "0.4s", opacity: 0 }}>
            PROGRAMA <span className="text-emerald-500 italic">PREANI</span>
          </h1>
          <p className="text-emerald-100/60 text-lg md:text-xl font-light max-w-2xl mx-auto animate-header-text" style={{ animationDelay: "0.6s", opacity: 0 }}>
            Programa de Estudios Avanzados en Negocios Inmobiliarios. La evolución de la excelencia académica en Venezuela.
          </p>
        </div>
      </header>

      <main className="bg-white text-slate-900 rounded-t-[4rem] -mt-12 relative z-10 px-6 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* SECCIÓN INTRODUCTORIA DETALLADA */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 bg-slate-50 p-8 lg:p-16 rounded-[3rem] border border-emerald-50 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl" />
            
            <div className="w-full lg:w-1/3 flex justify-center relative z-10">
              <img src={logoPreani} alt="Logo PREANI" className="w-64 h-auto drop-shadow-2xl" />
            </div>
            <div className="w-full lg:w-2/3 space-y-6 relative z-10">
              <h2 className="text-3xl font-black text-[#022c22] uppercase tracking-tight">Sobre el Programa</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                El PREANI es la evolución del histórico programa FIPI, con más de 25 años formando a la élite del sector. Este diplomado avanzado está diseñado para brindar una comprensión profunda de los escenarios económicos y legales más exigentes.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Aval Universitario UCAB
                </span>
                <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    3 Trimestres Académicos
                </span>
                <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Especialización de Alto Nivel
                </span>
              </div>
            </div>
          </div>

          {/* SECCIÓN REQUISITOS Y PLANILLAS EQUIPARADA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-stretch">
            <div className="relative rounded-[3rem] overflow-hidden group min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Formación" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-[#022c22]/90 flex flex-col justify-end p-12 text-white">
                <p className="text-emerald-500 font-black uppercase tracking-widest text-xs mb-3">Plan de Estudios</p>
                <h3 className="text-4xl font-black tracking-tight mb-6">Lidera con Conocimiento</h3>
                <p className="text-emerald-100/80 leading-relaxed mb-8">
                  El PREANI ofrece herramientas prácticas destinadas a una mayor y mejor comprensión de los distintos escenarios del sector inmobiliario actual.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => window.open('/pensum-preani.pdf', '_blank')} 
                    className="px-8 py-4 bg-emerald-500 text-[#022c22] rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                  >
                    Descargar Pensum
                  </button>
                  <button 
                    onClick={() => navigate('/contacto')}
                    className="px-8 py-4 border border-emerald-500 text-emerald-400 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
                  >
                    Solicitar Información
                  </button>
                </div>
              </div>
            </div>

            <div className="relative rounded-[3rem] overflow-hidden flex items-end">
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
                alt="Documentación" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="relative z-10 w-full p-12 bg-white/95 backdrop-blur-sm m-6 rounded-2xl shadow-2xl space-y-8">
                <h3 className="text-3xl font-black text-[#022c22] tracking-tight border-b border-emerald-100 pb-4">Inscripciones Abiertas</h3>
                <p className="text-slate-600 text-sm">Descargue y complete las planillas de inscripción para iniciar su proceso académico formal:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/Formato_Ingreso.pdf" download className="flex items-center justify-center px-4 py-4 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-[11px] hover:bg-emerald-200 transition-all uppercase tracking-tighter">
                    Formato Ingreso (PDF)
                  </a>
                  <a href="/Inscrip_Diplomado.pdf" download className="flex items-center justify-center px-4 py-4 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-[11px] hover:bg-emerald-200 transition-all uppercase tracking-tighter">
                    Inscrip. Diplomado (PDF)
                  </a>
                  <a href="/Inscripcion_UCAB.pdf" download className="flex items-center justify-center px-4 py-4 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-[11px] hover:bg-emerald-200 transition-all uppercase tracking-tighter md:col-span-2">
                    Planilla de Inscripción General (PDF)
                  </a>
                </div>
                <p className="text-[10px] text-slate-400 italic text-center uppercase tracking-widest">Verifique fechas de inicio de cohorte</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#022c22] uppercase tracking-tight">Estructura Curricular</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4" />
          </div>

          {/* LÍNEA DE TIEMPO */}
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
            {modulos.map((mod, index) => (
              <ModuloPreani key={index} index={index} numero={mod.numero} titulo={mod.titulo} descripcion={mod.descripcion} />
            ))}
          </div>

          {/* CONTACTO WATERMARK */}
          <div className="relative mt-16 group"> 
            <div 
              ref={(el) => setRevealEstudiosa(el)} 
              className="reveal-on-scroll absolute -bottom-50 -left-150 z-10 pointer-events-none hidden lg:block transition-all duration-1000 opacity-0 [&.active]:opacity-20"
            >
              <img src={Estudiosa} alt="Watermark" className="h-[800px] w-auto max-w-none transform" />
            </div>
            <div 
              ref={(el) => setRevealEstudioso(el)} 
              className="reveal-on-scroll absolute -bottom-40 left-270 z-10 pointer-events-none hidden lg:block transition-all duration-1000 opacity-0 [&.active]:opacity-20"
            >
              <img src={Estudioso} alt="Watermark" className="h-[650px] w-auto max-w-none transform" />
            </div>
          
            <div className="relative z-10 p-12 rounded-[4rem] bg-[#022c22]/95 backdrop-blur-sm text-white text-center space-y-8 overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">
                  ¿Listo para el siguiente nivel profesional?
                </h3>
                <p className="text-emerald-200/70 mb-8 max-w-xl mx-auto italic">
                  Inicia tu proceso de preinscripción para la próxima cohorte del PREANI. Fórmate con los mejores especialistas del sector inmobiliario.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/contacto')}
                    className="px-10 py-4 bg-emerald-500 text-[#022c22] rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                  >
                    Deseo más información
                  </button>
                  <a 
                    href="https://wa.me/584241554321" 
                    className="px-10 py-4 border border-emerald-500/50 text-emerald-400 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#011a14] px-6 lg:px-20 py-12 pt-16 text-center border-t border-white/5 relative z-10">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
          PREANI • COORDINACIÓN DE FORMACIÓN • CÁMARA INMOBILIARIA • 2026
        </p>
      </footer>
    </div>
  );
}
