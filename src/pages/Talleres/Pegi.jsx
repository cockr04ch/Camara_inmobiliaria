import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// --- IMPORTACIONES DE IMÁGENES (Asegúrate de tener estas rutas correctas) ---
// Imagen de fondo con una ciudad de Venezuela o una ciudad profesional moderna
import bgPegi from "../../assets/Pzo.jpg"; 
// La imagen que me pasaste de las manos sobre la laptop con planos (Imagen 7)
import logoPegi from "../../assets/Pegi.jpg"; 
import Navbar2 from "../../Components/Navbar_sc";
import Estudiosa from "../../assets/estudiosa1.png"; // Importación de la imagen de la chica estudiosa
import Estudioso from "../../assets/estudioso1.png";

// Hook de revelado para animaciones al hacer scroll (Mantenemos tu lógica original)
const useScrollReveal = () => {
  const [ref, setRef] = useState(null);

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

// Componente para los módulos académicos de PEGI (Gerencia)
const ModuloPegi = ({ numero, titulo, descripcion, index }) => {
  const setReveal = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={setReveal}
      className="reveal-on-scroll relative mb-16 md:mb-20 flex flex-col md:flex-row items-center"
    >
      {/* Indicador de Módulo */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-12 h-12 rounded-xl bg-emerald-500 items-center justify-center z-20 shadow-lg border-2 border-white text-white font-black">
        {numero}
      </div>
      
      {/* Contenido Dinámico */}
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
  const setRevealEstudiosa = useScrollReveal(); 
  const setRevealEstudioso = useScrollReveal(); 

  // --- DATOS DE LOS MÓDULOS DE PEGI (Basado en la formación gerencial) ---
  const modulos = [
    {
      numero: "01",
      titulo: "Gerencia Estratégica",
      descripcion: "Planificación avanzada y visión de largo plazo para empresas del sector inmobiliario."
    },
    {
      numero: "02",
      titulo: "Finanzas Inmobiliarias",
      descripcion: "Análisis de inversiones, valoración de activos y control de costos gerenciales."
    },
    {
      numero: "03",
      titulo: "Marketing y Ventas",
      descripcion: "Estrategias comerciales de vanguardia y técnicas de negociación de alto nivel."
    },
    {
      numero: "04",
      titulo: "Liderazgo Gerencial",
      descripcion: "Habilidades de gerencia, comunicación, compromiso y trabajo en equipo con inspiración."
    },
    {
      numero: "05",
      titulo: "Gestión de Proyectos",
      descripcion: "Planificación técnica para la preservación de activos y optimización de recursos."
    },
     {
      numero: "06",
      titulo: "Derecho Mercantil",
      descripcion: "Análisis profundo de la Ley de Propiedad Horizontal y normativas vigentes en el sector."
    },
  ];

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 scroll-smooth">
      <Navbar2 />

      {/* --- HEADER CON IMÁGEN DE CIUDAD GERENCIAL (Moderno) --- */}
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
            Especialización en Gerencia
          </p>
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter animate-header-text" style={{ animationDelay: "0.4s", opacity: 0 }}>
            PROGRAMA <span className="text-emerald-500 italic">PEGI</span>
          </h1>
          <p className="text-emerald-100/60 text-lg md:text-xl font-light max-w-2xl mx-auto animate-header-text" style={{ animationDelay: "0.6s", opacity: 0 }}>
            Programa de Especialización en Gerencia Inmobiliaria. En alianza con Iplaza Soluciones.
          </p>
        </div>
      </header>

      {/* --- CUERPO PRINCIPAL --- */}
      <main className="bg-white text-slate-900 rounded-t-[4rem] -mt-12 relative z-10 px-6 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* SECCIÓN INTRODUCTORIA (Basada en la Imagen 7) */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 bg-slate-50 p-8 lg:p-16 rounded-[3rem] border border-emerald-50 relative overflow-hidden">
             {/* Decoración de fondo */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl"/>
            
            <div className="w-full lg:w-1/3 flex justify-center relative z-10">
              {/* Imagen de PEGI (Imagen 7: Manos sobre laptop con planos) */}
              <img src={logoPegi} alt="Formación PEGI" className="w-full h-auto drop-shadow-2xl rounded-xl" />
            </div>
            <div className="w-full lg:w-2/3 space-y-6 relative z-10">
              <h2 className="text-3xl font-black text-[#022c22] uppercase tracking-tight">Gerentes de Negocio</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                La Cámara Inmobiliaria de Venezuela en alianza con <strong>Iplaza Soluciones</strong>, dicta el Programa de Especialización en Gerencia Inmobiliaria (PEGI), para la formación de gerentes del negocio inmobiliario. 
                Los participantes obtendrán preparación como gerentes y líderes para optimizar la gestión de su empresa.
              </p>
              <div className="flex gap-4 pt-2">
                <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Liderazgo Gerencial
                </span>
                <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold flex items-center gap-2">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Optimización Empresarial
                </span>
              </div>
            </div>
          </div>

          {/* --- NUEVA SECCIÓN: REQUISITOS Y CÓMO INSCRIBIRSE (Estilo PADI original) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-stretch">
            {/* Columna Izquierda: Imagen y Descripción del Programa (Gerencia) */}
            <div className="relative rounded-[3rem] overflow-hidden group">
             
              <div className="absolute inset-0 bg-[#022c22]/90 flex flex-col justify-end p-12 text-white">
                <p className="text-emerald-500 font-black uppercase tracking-widest text-xs mb-3">PEGI</p>
                <h3 className="text-4xl font-black tracking-tight mb-6">Lidera el Futuro Inmobiliario</h3>
                <p className="text-emerald-100/80 leading-relaxed mb-8">
                  Forma parte del programa diseñado para optimizar la gestión de tu empresa inmobiliaria. Desarrolla habilidades gerenciales, comunicación y compromiso para el éxito empresarial sostenido.
                </p>
                <div className="flex gap-4 self-start">
                   <button 
                      onClick={() => window.open('/ruta-al-pensum-pegi.pdf', '_blank')} 
                      className="inline-block px-10 py-4 bg-emerald-500 text-[#022c22] rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                    >
                      Descarga el Pensum (PDF)
                    </button>
                    <button 
                      onClick={() => navigate('/contacto')}
                      className="inline-block px-10 py-4 border border-emerald-500 text-emerald-400 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
                    >
                      Deseo Solicitar Info
                    </button>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Cómo Inscribirse (con imagen de fondo) */}
            <div className="relative rounded-[3rem] overflow-hidden flex items-end">
               {/* Usamos una imagen que sugiera documentos/profesionales */}
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                alt="Inscripciones Abiertas PEGI" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 w-full p-12 bg-white/95 backdrop-blur-sm m-6 rounded-2xl shadow-2xl space-y-8">
                <h3 className="text-3xl font-black text-[#022c22] tracking-tight border-b border-emerald-100 pb-4">Proceso de Inscripción</h3>
                <ol className="list-decimal list-outside pl-6 space-y-4 text-slate-700 text-lg">
                  <li><strong>Descarga</strong> la planilla de inscripción oficial de nuestro portal.</li>
                  <li><strong>Completa</strong> todos los requisitos y documentos solicitados.</li>
                  <li><strong>Envía</strong> la documentación digitalizada por correo electrónico.</li>
                </ol>
                <p className="text-sm text-slate-500 italic">Una vez recibidos, la Coordinación de Formación se pondrá en contacto contigo.</p>
              </div>
            </div>
          </div>

          {/* --- LÍNEA DE TIEMPO DE CONTENIDO ACADÉMICO --- */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#022c22] uppercase tracking-tight">Estructura Académica</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4" />
          </div>

          <div className="relative">
            {/* Línea vertical decorativa */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

            {modulos.map((mod, index) => (
              <ModuloPegi 
                key={index}
                index={index}
                numero={mod.numero}
                titulo={mod.titulo}
                descripcion={mod.descripcion}
              />
            ))}
          </div>

            {/* --- SECCIÓN DE CONTACTO CON LA CHICA COMO MARCA DE AGUA (Corregido) --- */}
                                  <div className="relative mt-16 group"> 
                        
                        {/* 1. La Chica: Ahora está vinculada a este contenedor específico */}
                        <div 
                          ref={setRevealEstudiosa} 
                          className="reveal-on-scroll absolute -bottom-50 -left-150 z-10 pointer-events-none hidden lg:block transition-all duration-1000 opacity-0 [&.active]:opacity-20"
                        >
                          <img 
                            src={Estudiosa} 
                            alt="Fondo Estudiosa PREANI" 
                            className="h-[800px] w-auto max-w-none transform"
                          />
                        </div>
                          <div 
                          ref={setRevealEstudioso} 
                          className="reveal-on-scroll absolute -bottom-40 left-270 z-10 pointer-events-none hidden lg:block transition-all duration-1000 opacity-0 [&.active]:opacity-20"
                        >
                          <img 
                            src={Estudioso} 
                            alt="Fondo Estudiosa PREANI" 
                            className="h-[650px] w-auto max-w-none transform"
                          />
                        </div>
                      
                        {/* 2. Tarjeta de Contacto: Con z-10 para estar por encima y un fondo con ligero blur */}
                        <div className="relative z-10 p-12 rounded-[4rem] bg-[#022c22]/95 backdrop-blur-sm text-white text-center space-y-8 overflow-hidden border border-white/5">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                          
                          <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">
                              ¿Quieres certificarte como Profesional?
                            </h3>
                            <p className="text-emerald-200/70 mb-8 max-w-xl mx-auto">
                              Inicia tu proceso de preinscripción para la próxima cohorte del PREANI. Fórmate con los mejores especialistas del sector.
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

      {/* --- FOOTER --- */}
      <footer className="bg-[#011a14] px-6 lg:px-20 py-12 pt-16 text-center border-t border-white/5 relative z-10">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
          PEGI • Coordinación de Formación • Cámara Inmobiliaria 
        </p>
      </footer>
    </div>
  );
}