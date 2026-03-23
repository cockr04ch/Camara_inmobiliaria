
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cursos from './pages/Formacion/Talleres';
import Home from './Home';
//Pages
import MisionVision from './pages/MisionVision/MisionVision';
import JuntaDirectiva from './pages/Juntadirectiva/JuntaDirectiva';
import Historia from './pages/Historia/Historia';
import CIV from './pages/CIV/Civ'
import Direccion from './pages/Direccion/Direccion';
import Proposito from './pages/Proposito/Proposito';

import Padi from './pages/Talleres/Padi';
import Preani from './pages/Talleres/Preani';
import Actividades from './pages/Talleres/Otros';
import Cibir from './pages/Talleres/Cibir';
import Pegi from './pages/Talleres/Pegi';

import ScrollToTop from "./Components/ScrollToTop";

export default function LandingBolivar() {
 
  return (
   <BrowserRouter basename="/Camara_inmobiliaria" >
    <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Home/>} />
        {/*Talleres*/}
        <Route path="/cibir" element={<Cibir/>} />
        <Route path="/pegi" element={<Pegi/>} />
        <Route path="/padi" element={<Padi/>} />
        <Route path="/preani" element={<Preani/>} />
        <Route path="/otros" element={<Actividades/>} />
        <Route path="/talleres" element={<Cursos/>} />
        {/*Otros*/}
        <Route path='/mision_vision' element={<MisionVision/>} />
        <Route path='/junta_directiva' element={<JuntaDirectiva/>} />
        <Route path='/historia' element={<Historia/>} />
        <Route path='/codigo_etica' element={<CIV/>} />
        <Route path='/direccion' element={<Direccion/>} />
        <Route path='/proposito' element={<Proposito/>} />
      </Routes>
    </BrowserRouter>
  );
}