import React, { useRef, useEffect, useState } from "react"; // IMPORTANTE: Agregamos useState
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import bgBolivar from "../../assets/Pzo.jpg";
import Navbar2 from "../../Components/Navbar_sc";
import francisco from "../../assets/Junta_directiva/francisco.png"
import graciela from "../../assets/Junta_directiva/Graciela.png"
import margaret from "../../assets/Junta_directiva/Margaret.png"
import margot from "../../assets/Junta_directiva/Margot.png"
import neohomar from "../../assets/Junta_directiva/Neohomar.png"
import pedro from "../../assets/Junta_directiva/Pedro.png"
import Romelina from "../../assets/Junta_directiva/Romelia.png"
import Yorjharry from "../../assets/Junta_directiva/Yorjharry.png"
import Rina from "../../assets/Junta_directiva/Rina.png"
import Zulay from "../../assets/Junta_directiva/Zulay.png"
import Pedro_C from "../../assets/Junta_directiva/Pedro_C.png"

// 1. EL HOOK DEBE ESTAR AQUÍ AFUERA
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
      { threshold: 0.1 } // Un poco menos de threshold para que active más fácil
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return setRef;
};

// Datos de la directiva
const directiva = [
  { nombre: "Francisco Piñango", cargo: "Presidente", foto: francisco },
  { nombre: "Zulay Amaya", cargo: "Vice-Presidente", foto: Zulay },
  { nombre: "Margaret Vásquez", cargo: "Directora General", foto: margaret },
  { nombre: "Romelina Rodríguez", cargo: "Directora de Finanzas", foto:Romelina },
  { nombre: "Margot Castro", cargo: "Directora de Asuntos Legales", foto: margot},
  { nombre: "Pedro Vallenilla", cargo: "Director de Comunicaciones", foto: pedro },
  { nombre: "Graciela Ledezma", cargo: "Director de Formación", foto: graciela },
  { nombre: "Yorjharry Vicent", cargo: "Director de Eventos", foto: Yorjharry },
  { nombre: "Rina Centeno", cargo: "Directora de Responsabilidad Social", foto: Rina},
  { nombre: "Pedro Castro", cargo: "Director de Relaciones Interinstitucionales", foto: Pedro_C},
  { nombre: "Neohomar Longart", cargo: "Director de Atención al Gremiado", foto: neohomar},
];

const DirectorCard = ({ nombre, cargo, foto, index }) => {
  const setReveal = useScrollReveal(); 
  return (
    <div 
      ref={setReveal} 
      style={{ transitionDelay: `${index * 0.1}s` }} 
      className="reveal-on-scroll group bg-white rounded-[2.5rem] p-5 border border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-700"
    >
      <div className="relative overflow-hidden rounded-[2rem] aspect-square mb-6 bg-slate-100">
        <img
          src={foto}
          alt={nombre}
          className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black text-[#022c22] leading-tight group-hover:text-emerald-600 transition-colors">
          {nombre}
        </h3>
        <p className="text-emerald-500 font-black uppercase tracking-[0.15em] text-[10px] bg-emerald-50 py-1 px-3 rounded-full inline-block">
          {cargo}
        </p>
      </div>
    </div>
  );
};

export default function EquipoDirectivo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 scroll-smooth">
      <Navbar2 />

      <header
        className="relative px-6 lg:px-20 py-16 lg:py-24 flex items-center justify-center min-h-[40vh] bg-cover animate-header-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 44, 34, 0.85), rgba(2, 44, 34, 0.85)), url(${bgBolivar})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center space-y-4">
          <p className="text-emerald-500 font-black uppercase tracking-[0.3em] text-xs animate-header-text" style={{ animationDelay: "0.2s", opacity: 0 }}>Liderazgo Gremial</p>
          <h1 style={{ animationDelay: "0.4s", opacity: 0 }} className="text-5xl lg:text-7xl font-black tracking-tighter animate-header-text">
            Junta <span className="text-emerald-500 italic">Directiva</span>
          </h1>
          <p className="text-emerald-100/60 text-sm tracking-widest uppercase font-medium animate-header-text" style={{ animationDelay: "0.5s", opacity: 0 }} >Gestión 2024 - 2026</p>
        </div>
      </header>

      <main className="bg-white text-slate-900 rounded-t-[4rem] -mt-12 relative z-10 px-6 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {directiva.map((miembro, index) => (
              <DirectorCard 
                key={index} 
                index={index} // PASAMOS EL INDEX PARA EL DELAY
                nombre={miembro.nombre} 
                cargo={miembro.cargo} 
                foto={miembro.foto}
              />
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] bg-[#022c22] text-white text-center space-y-6 shadow-2xl shadow-emerald-900/20">
            <h2 className="text-3xl font-black tracking-tight">¿Deseas contactar con alguna dirección?</h2>
            <button className="px-10 py-4 bg-emerald-500 text-[#022c22] rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all">
              Enviar un mensaje
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-[#011a14] px-6 lg:px-20 py-12 text-center border-t border-white/5">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
          © 2026 Cámara Inmobiliaria del Estado Bolívar • RIF J-30462520-0
        </p>
      </footer>
    </div>
  );
}