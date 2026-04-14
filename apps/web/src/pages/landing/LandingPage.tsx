import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '@/config/env'

// Importación de Componentes
import Navbar from '@/pages/landing/components/navbar/Navbar'
import Header from '@/pages/landing/components/Header'
import NosotrosSection from '@/pages/landing/components/sections/NosotrosSection'
import OrigenesSection from '@/pages/landing/components/sections/OrigenesSection'
import AfiliadosSection from '@/pages/landing/components/sections/AfiliadosSection'
import FormacionSection from '@/pages/landing/components/sections/FormacionSection'
import DirectivaSection from '@/pages/landing/components/sections/DirectivaSection'
import ConveniosSection from '@/pages/landing/components/sections/ConveniosSection'
import NoticiasSection from '@/pages/landing/components/sections/NoticiasSection'
import Footer from '@/pages/landing/components/Footer'
import LoginModal from '@/pages/landing/components/LoginModal'
import RegisterModal from '@/pages/landing/components/RegisterModal'

export default function LandingPage() {
  const [isModalSesionOpen, setIsSesionModalOpen] = useState(false)
  const [isModalRegisterOpen, setIsRegisterModalOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [cfg, setCfg] = useState<Record<string, string>>({})

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${API_URL}/api/cms/config`)
      .then(r => r.json())
      .then(data => { if (data.success) setCfg(data.config || {}) })
      .catch(() => { })
  }, [])

  return (
    <div className='min-h-screen bg-[#022c22] text-white font-sans selection:bg-emerald-500/30 scroll-smooth'>
      <div className={`${darkMode ? 'dark bg-[#022c22]' : 'bg-slate-50'} min-h-screen transition-colors duration-300`}>

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setIsSesionModalOpen={setIsSesionModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
          cfg={cfg}
        />

        <Header darkMode={darkMode} cfg={cfg} />
      </div>

      <NosotrosSection cfg={cfg} />

      <OrigenesSection cfg={cfg} />

      <AfiliadosSection cfg={cfg} />

      <FormacionSection cfg={cfg} />

      <DirectivaSection cfg={cfg} />

      {/* <ConveniosSection cfg={cfg} /> */}

      {/* <NoticiasSection scrollRef={scrollRef} cfg={cfg} /> */}

      <Footer cfg={cfg} />

      {/* MODALES */}
      {isModalSesionOpen && <LoginModal onClose={() => setIsSesionModalOpen(false)} />}
      {isModalRegisterOpen && <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />}
    </div>
  )
}