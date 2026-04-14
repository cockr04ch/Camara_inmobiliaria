import React, { useState, useEffect } from 'react'
import { API_URL } from '@/config/env'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const FALLBACK_LOGOS = [
  { id: 1, nombre: 'UCAB', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIgmOl4EASpo1hjggjQq_xP61myeh_nkr9w&s' },
  { id: 2, nombre: 'Total Salud', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIgmOl4EASpo1hjggjQq_xP61myeh_nkr9w&s' },
  { id: 3, nombre: 'Fénix Salud', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIgmOl4EASpo1hjggjQq_xP61myeh_nkr9w&s' },
  { id: 4, nombre: 'Aliado 4', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIgmOl4EASpo1hjggjQq_xP61myeh_nkr9w&s' }
]

export default function ConveniosSection({ cfg = {} }: { cfg?: Record<string, string> }) {
  const [logos, setLogos] = useState(FALLBACK_LOGOS)
  const revealTextConvenios = useScrollReveal()

  useEffect(() => {
    fetch(`${API_URL}/api/cms/convenios`)
      .then(r => r.json())
      .then(data => { if (data.success && data.data.length > 0) setLogos(data.data) })
      .catch(() => { })
  }, [])

  const marqueeStyle = `
    @keyframes marquee-infinite { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee-infinite { display: flex; width: max-content; animation: marquee-infinite 20s linear infinite; }
    .pause-on-hover:hover { animation-play-state: paused; }
  `

  return (
    <section id='convenios' className='bg-white py-10 scroll-mt-24 overflow-hidden'>
      <style>{marqueeStyle}</style>
      <div className='max-w-7xl mx-auto px-6 lg:px-20 mb-16'>
        <div ref={revealTextConvenios} className='space-y-4 reveal-on-scroll -ml-8'>
          <h2 className='text-5xl lg:text-7xl font-bold text-[#333333] tracking-tighter -ml-4'>
            {cfg['convenios_marquee_titulo'] || 'Convenios y beneficios'}
          </h2>
        </div>
        <div className='relative mt-16 bg-slate-50 border border-gray-100 rounded-[3rem] py-12 overflow-hidden'>
          <div className='absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none' />
          <div className='absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none' />
          <div className='flex'>
            <div className='animate-marquee-infinite pause-on-hover flex items-center'>
              {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                <div key={i} className='mx-10 lg:mx-16 flex-shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 transform hover:scale-110'>
                  <img src={logo.logo_url || logo.url} alt={logo.nombre || logo.name} className='h-12 w-auto object-contain' />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='pt-10 border-t border-gray-100'>
          <a href='#formacion' className='group flex items-center gap-3'>
            <span className='text-emerald-600 font-black uppercase tracking-widest text-xs group-hover:mr-4 transition-all'>
              {cfg['convenios_link'] || 'Conoce nuestros programas de formación inmobiliaria'}
            </span>
            <div className='h-[2px] w-12 bg-emerald-500 group-hover:w-24 transition-all' />
          </a>
        </div>
      </div>
    </section>
  )
}