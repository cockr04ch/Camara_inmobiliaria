import { Router } from 'express';
import { buscarAfiliadosPublic } from '../controllers/afiliados.controller.js';
import { publicPreinscribirProgramaPrincipal, publicListCursos, publicPreinscribirCurso } from '../controllers/academia.controller.js';
import { getPaginaBySlug } from '../controllers/cms.controller.js';
import { publicGetComprobanteByCodigo } from '../controllers/certificados.controller.js';

const router = Router();

// GET /api/public/afiliados/buscar
router.get('/afiliados/buscar', buscarAfiliadosPublic);

// POST /api/public/preinscripciones
router.post('/preinscripciones', publicPreinscribirProgramaPrincipal);

// GET /api/public/cursos
router.get('/cursos', publicListCursos);

// POST /api/public/cursos/:id/preinscribir
router.post('/cursos/:id/preinscribir', publicPreinscribirCurso);

// GET /api/public/paginas/:slug — contenido JSON de página pública (CMS)
router.get('/paginas/:slug', getPaginaBySlug);

// GET /api/public/comprobantes/:codigo — verificación de comprobante digital
router.get('/comprobantes/:codigo', publicGetComprobanteByCodigo);

export { router as publicRoutes };
