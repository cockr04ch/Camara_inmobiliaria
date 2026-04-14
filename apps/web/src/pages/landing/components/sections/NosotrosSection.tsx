import React from 'react'
import { Link } from 'react-router-dom'

export default function NosotrosSection({ cfg = {} }: { cfg?: Record<string, string> }) {
  return (
    <section id='nosotros' className='scroll-mt-24 bg-white text-slate-900 rounded-t-[4rem] px-6 lg:px-20 py-20 border-b border-gray-100'>
      <div className='max-w-4xl mx-auto text-center space-y-8'>
        <h2 className='text-4xl lg:text-5xl font-bold text-[#022c22]'>
          Sobre la Cámara
        </h2>
        <p className='text-lg text-slate-600 leading-relaxed italic'>
          La Cámara Inmobiliaria del Estado Bolívar (CIEBO) es una Asociación Civil sin fines de lucro, agrupa a instituciones, a personas jurídicas y naturales y que como actores del sector inmobiliario contribuyen con su acción e inversión al desarrollo del sector inmobiliario regional y nacional.
        </p>

        <div className='grid md:grid-cols-3 gap-10'>
          {[
            {
              title: 'Misión y Visión',
              img: 'https://escalas.org/wp-content/uploads/2019/10/4-1.jpg',
              desc: 'Hacia dónde proyectamos el futuro del sector.',
              path: '/mision_vision'
            },
            {
              title: 'Propósito',
              img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
              desc: 'Décadas de compromiso con el desarrollo regional.',
              path: '/proposito'
            },
            {
              title: 'Junta Directiva',
              img: 'https://gentecompetente.com/wp-content/uploads/2023/10/las-empresas-que-se-hacen-querer.jpg',
              desc: 'Nuestra razón de ser y motor de cambio diario.',
              path: '/junta_directiva'
            }
          ].map((card, i) => (
            <Link key={i} to={card.path} className='group cursor-pointer block'>
              <div className='relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-4 shadow-2xl shadow-emerald-900/10'>
                <img
                  src={card.img}
                  alt={card.title}
                  className='w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out'
                />
                <div className='absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              </div>
              <div className='bg-emerald-600 group-hover:bg-emerald-500 text-white p-5 rounded-2xl flex items-center justify-center gap-3 transition-colors duration-300 shadow-lg shadow-emerald-600/20'>
                <span className='font-bold uppercase tracking-wider text-sm text-center'>
                  {card.title}
                </span>

                <svg
                  className='w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M14 5l7 7m0 0l-7 7m7-7H3' />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className='flex justify-center pt-8'>
          <button className='px-10 py-3 border-2 border-emerald-500 text-emerald-600 rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-500 hover:text-white transition-all'>
            {cfg['nosotros_boton'] || 'Contáctanos'}
          </button>
        </div>
      </div>
    </section>
  )
}