import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgPegi from "../assets/Pzo.jpg"; 
import logoPegi from "../assets/Pegi.jpg"; 
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

const ModuloPegi: React.FC<ModuloProps> = ({ numero, titulo, descripcion, index }) => {
  const setReveal = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={(el) => setReveal(el)} 
      className="reveal-on-scroll relative mb-16 md:mb-20 flex flex-col md:flex-row items-center"
    >
      {/* Indicador de Módulo con Estilo Gerencial */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-12 h-12 rounded-xl bg-emerald-500 items-center justify-center z-20 shadow-lg border-2 border-white text-white font-black">
        {numero}
      </div>
      
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:order-last text-left'}`}>
        <h3 className="text-2xl font-black text-[#022c22] mb-3 uppercase tracking-tight">
          {titulo}
        </h3>
        <p className="text-slate-600 leading-relaxed text-lg italic">
          {descripcion}
        </p>
      </div>
      
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

export default function Pegi() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const setRevealEstudiosa = useScrollReveal(); 
  const setRevealEstudioso = useScrollReveal(); 

  // Datos extendidos para equiparar la complejidad técnica
  const modulos: Omit<ModuloProps, "index">[] = [
    { 
      numero: "01", 
      titulo: "Gerencia Estratégica", 
      descripcion: "Desarrollo de pensamiento sistémico y planificación avanzada para la sostenibilidad de empresas inmobiliarias en mercados volátiles." 
    },
    { 
      numero: "02", 
      titulo: "Finanzas Inmobiliarias", 
      descripcion: "Ingeniería financiera aplicada, valoración técnica de activos, control de gestión y optimización de estructuras de costos gerenciales." 
    },
    { 
      numero: "03", 
      titulo: "Marketing y Ventas", 
      descripcion: "Diseño de estrategias comerciales de alto nivel y dominio de técnicas de negociación corporativa para cierres de gran escala." 
    },
    { 
      numero: "04", 
      titulo: "Liderazgo Gerencial", 
      descripcion: "Potenciación de habilidades directivas, comunicación asertiva, gestión de crisis y compromiso organizacional con visión inspiradora." 
    },
    { 
      numero: "05", 
      titulo: "Gestión de Proyectos", 
      descripcion: "Metodologías técnicas para la preservación de activos, planificación de mantenimiento y optimización de recursos operativos." 
    },
    { 
      numero: "06", 
      titulo: "Derecho Mercantil", 
      descripcion: "Análisis jurídico exhaustivo de la Ley de Propiedad Horizontal y cumplimiento de normativas vigentes en el entorno empresarial." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 scroll-smooth">
      <Navbar />

      {/* HEADER CON ANIMACIÓN DE FONDO UNIFICADA */}
      <header
        className="relative px-6 lg:px-20 py-20 lg:py-32 flex items-center justify-center min-h-[55vh] bg-cover animate-header-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 44, 34, 0.8), rgba(2, 44, 34, 0.9)), url(${bgPegi})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center space-y-6 max-w-4xl">
          <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs animate-header-text" style={{ animationDelay: "0.2s", opacity: 0 }}>
            Formación Directiva Superior
          </p>
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter animate-header-text" style={{ animationDelay: "0.4s", opacity: 0 }}>
            PROGRAMA <span className="text-emerald-500 italic">PEGI</span>
          </h1>
          <p className="text-emerald-100/60 text-lg md:text-xl font-light max-w-2xl mx-auto animate-header-text" style={{ animationDelay: "0.6s", opacity: 0 }}>
            Especialización en Gerencia Inmobiliaria. Liderazgo estratégico para la optimización de la gestión empresarial.
          </p>
        </div>
      </header>

      <main className="bg-white text-slate-900 rounded-t-[4rem] -mt-12 relative z-10 px-6 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* SECCIÓN INTRODUCTORIA DE ALTO NIVEL */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 bg-slate-50 p-8 lg:p-16 rounded-[3rem] border border-emerald-50 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl" />
            
            <div className="w-full lg:w-1/3 flex justify-center relative z-10">
              <img src={logoPegi} alt="Formación Gerencial PEGI" className="w-full h-auto drop-shadow-2xl rounded-2xl shadow-emerald-900/10" />
            </div>
            <div className="w-full lg:w-2/3 space-y-6 relative z-10">
              <h2 className="text-3xl font-black text-[#022c22] uppercase tracking-tight">Gerentes de Negocio</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Dictado en alianza estratégica con <strong>Iplaza Soluciones</strong>, el PEGI es la herramienta definitiva para directivos. Los participantes obtienen una preparación integral para liderar organizaciones y maximizar la rentabilidad de su gestión empresarial.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Liderazgo Corporativo
                </span>
                <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Alianza Iplaza Soluciones
                </span>
              </div>
            </div>
          </div>

          {/* GRID DE INSCRIPCIÓN Y DESCARGAS (ESTILO ROBUSTO) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-stretch">
            <div className="relative rounded-[3rem] overflow-hidden group min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop" 
                alt="Finanzas" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-[#022c22]/90 flex flex-col justify-end p-12 text-white">
                <p className="text-emerald-500 font-black uppercase tracking-widest text-xs mb-3">Visión Gerencial</p>
                <h3 className="text-4xl font-black tracking-tight mb-6">Optimiza tu Empresa</h3>
                <p className="text-emerald-100/80 leading-relaxed mb-8">
                  Desarrolla las competencias necesarias para transformar la administración inmobiliaria tradicional en un modelo de negocio de alta eficiencia.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => window.open('/pensum-pegi.pdf', '_blank')} 
                    className="px-8 py-4 bg-emerald-500 text-[#022c22] rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                  >
                    Descargar Pensum PEGI
                  </button>
                  <button 
                    onClick={() => navigate('/contacto')}
                    className="px-8 py-4 border border-emerald-500 text-emerald-400 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
                  >
                    Solicitar Auditoría
                  </button>
                </div>
              </div>
            </div>

            <div className="relative rounded-[3rem] overflow-hidden flex items-end">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                alt="Inscripción Gerencial" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="relative z-10 w-full p-12 bg-white/95 backdrop-blur-sm m-6 rounded-2xl shadow-2xl space-y-8">
                <h3 className="text-3xl font-black text-[#022c22] tracking-tight border-b border-emerald-100 pb-4">Proceso de Ingreso</h3>
                <ol className="list-decimal list-outside pl-6 space-y-4 text-slate-700 text-base">
                  <li><strong>Registro:</strong> Descarga y completa la planilla de postulación oficial.</li>
                  <li><strong>Documentación:</strong> Adjunta síntesis curricular y credenciales profesionales.</li>
                  <li><strong>Validación:</strong> Envía tu expediente digitalizado para revisión de la junta.</li>
                  <li><strong>Formalización:</strong> Una vez aprobado, procede con el pago de matrícula.</li>
                </ol>
                <div className="pt-4">
                  <button 
                    onClick={() => navigate('/contacto')} 
                    className="w-full py-4 bg-[#022c22] text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Iniciar Postulación Gerencial
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#022c22] uppercase tracking-tight">Estructura Académica</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4" />
          </div>

          {/* LÍNEA DE TIEMPO ACADÉMICA */}
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
            {modulos.map((mod, index) => (
              <ModuloPegi key={index} index={index} numero={mod.numero} titulo={mod.titulo} descripcion={mod.descripcion} />
            ))}
          </div>

          {/* SECCIÓN DE CONTACTO CON WATERMARKS */}
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
                  ¿Listo para liderar la transformación gerencial?
                </h3>
                <p className="text-emerald-200/70 mb-8 max-w-xl mx-auto italic">
                  Únete a la nueva generación de gerentes inmobiliarios formados bajo estándares internacionales de excelencia.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/contacto')}
                    className="px-10 py-4 bg-emerald-500 text-[#022c22] rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                  >
                    Deseo Información Gerencial
                  </button>
                  <a 
                    href="https://wa.me/584241554321" 
                    className="px-10 py-4 border border-emerald-500/50 text-emerald-400 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#011a14] px-6 lg:px-20 py-12 pt-16 text-center border-t border-white/5 relative z-10">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
          PEGI • COORDINACIÓN DE FORMACIÓN • CÁMARA INMOBILIARIA • 2026
        </p>
      </footer>
    </div>
  );
}
