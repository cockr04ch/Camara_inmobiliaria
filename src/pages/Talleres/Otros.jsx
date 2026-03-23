import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// --- IMPORTACIONES DE IMÁGENES ---
// Imagen de la calle con árboles y edificios (Imagen 11)
import bgActividades from "../../assets/Actividades_header.png"; 
// Imagen del grupo en el conversatorio/biblioteca (Imagen 12)
import grupoActividades from "../../assets/actividades.png";
import Navbar2 from "../../Components/Navbar_sc";
import Estudiosa from "../../assets/estudiosa1.png"; // Importación de la imagen de la chica estudiosa
import Estudioso from "../../assets/estudioso1.png";

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

export default function Actividades() {
  const navigate = useNavigate();
  const setReveal = useScrollReveal();
  const setRevealEstudiosa = useScrollReveal(); 
  const setRevealEstudioso = useScrollReveal(); 

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 scroll-smooth">
      <Navbar2 />

      {/* --- HEADER DINÁMICO (Basado en Imagen 11) --- */}
      <header
        className="relative px-6 lg:px-20 py-24 lg:py-40 flex items-center min-h-[60vh] bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 44, 34, 0.7), rgba(2, 44, 34, 0.85)), url(${bgActividades})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-4xl animate-header-text">
          <p className="text-emerald-400 font-black uppercase tracking-[0.5em] text-xs mb-4">Comunidad Gremial</p>
          <h1 className="text-6xl lg:text-9xl font-black tracking-tighter mb-6">
            ACTIVIDADES
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-emerald-500" />
            <p className="text-xl lg:text-2xl font-light text-emerald-50/80 italic">
              Encuentros Inmobiliarios y más
            </p>
          </div>
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="bg-white text-slate-900 rounded-t-[4rem] -mt-16 relative z-10 px-6 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* SECCIÓN DESCRIPTIVA (Basada en Imagen 12) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="w-full lg:w-1/2 relative">
              {/* Decoración geométrica */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-emerald-500/20 rounded-tl-3xl" />
              <img 
                src={grupoActividades} 
                alt="Encuentro de profesionales" 
                className="w-full h-auto rounded-[2.5rem] shadow-2xl relative z-10" 
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-emerald-500/20 rounded-br-3xl" />
            </div>

            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-black text-[#022c22] leading-tight uppercase tracking-tight">
                Espacios de <span className="text-emerald-600 italic">Vanguardia</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  En la Cámara Inmobiliaria Metropolitana constantemente organizamos talleres, charlas y juntas directivas ampliadas con temas actualizados y de vanguardia.
                </p>
                <p>
                  Nuestro objetivo es brindar herramientas de trabajo a nuestros agremiados y profesionales inmobiliarios, acompañados por nuestro personal académico para garantizar el éxito de cada jornada.
                </p>
                <p className="font-semibold italic text-[#022c22]">
                  Mantenemos a los profesionales actualizados en temas legales, marketing, ventas y tecnologías.
                </p>
              </div>
            </div>
          </div>

          {/* --- GRILLA DE TIPOS DE ACTIVIDADES --- */}
          <div ref={setReveal} className="reveal-on-scroll grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <div className="p-10 bg-slate-50 rounded-[3rem] hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100 group">
              <div className="text-3xl mb-6 group-hover:scale-110 transition-transform inline-block">🗣️</div>
              <h3 className="text-xl font-black text-[#022c22] mb-4 uppercase">Charlas</h3>
              <p className="text-slate-500">Conversatorios dinámicos sobre la realidad del mercado actual.</p>
            </div>
            
            <div className="p-10 bg-[#022c22] rounded-[3rem] text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-emerald-500/20 text-6xl font-black italic">!</div>
              <div className="text-3xl mb-6 inline-block">🏛️</div>
              <h3 className="text-xl font-black mb-4 uppercase text-emerald-400">Juntas Ampliadas</h3>
              <p className="text-emerald-100/60">Sesiones directivas abiertas para la toma de decisiones gremiales.</p>
            </div>

            <div className="p-10 bg-slate-50 rounded-[3rem] hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100 group">
              <div className="text-3xl mb-6 group-hover:scale-110 transition-transform inline-block">🛠️</div>
              <h3 className="text-xl font-black text-[#022c22] mb-4 uppercase">Talleres</h3>
              <p className="text-slate-500">Sesiones prácticas de capacitación técnica y profesional.</p>
            </div>
          </div>

          {/* --- BANNER DE INVITACIÓN --- */}
          <div className="relative rounded-[4rem] overflow-hidden bg-slate-900 py-20 px-8 text-center">
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070')] bg-cover bg-center" />
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-black text-white">¿Quieres participar en nuestro próximo encuentro?</h3>
              <p className="text-emerald-100/60 text-lg">
                Mantente al día con nuestro calendario de eventos y no pierdas la oportunidad de conectar con otros líderes del sector.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  onClick={() => navigate('/eventos')}
                  className="px-12 py-5 bg-emerald-500 text-[#022c22] rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                >
                  Ver Calendario
                </button>
                <button 
                  onClick={() => window.open('https://wa.me/584241554321')}
                  className="px-12 py-5 border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all backdrop-blur-md"
                >
                  Consultar Fechas
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-[#011a14] px-6 lg:px-20 py-12 text-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
          CIM • Agenda de Actividades • Coordinación Académica
        </p>
      </footer>
    </div>
  );
}