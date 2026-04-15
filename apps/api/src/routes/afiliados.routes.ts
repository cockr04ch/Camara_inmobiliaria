import { Router } from 'express';
import { registerAfiliado, getAfiliados, getAfiliadoById, getMisCertificados, aprobarAfiliado, getSolicitudesCibir, rechazarAfiliado, verificarEmail, formalizarInscripcion } from '../controllers/afiliados.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/afiliados
router.get('/', requireAuth, requireRole('admin', 'super_admin'), getAfiliados);

// GET /api/afiliados/cibir/solicitudes
router.get('/cibir/solicitudes', requireAuth, requireRole('admin', 'super_admin'), getSolicitudesCibir);

// GET /api/afiliados/me/certificados — comprobantes digitales del usuario autenticado
router.get('/me/certificados', requireAuth, getMisCertificados);

// GET /api/afiliados/:id — para el portal del afiliado (requiere auth)
router.get('/:id', requireAuth, getAfiliadoById);

// POST /api/afiliados/registro
router.post('/registro', registerAfiliado);

// POST /api/afiliados/registro/verificar
router.post('/registro/verificar', verificarEmail);

// POST /api/afiliados/formalizar — Para que el afiliado pague su inscripción
router.post('/formalizar', requireAuth, formalizarInscripcion);

// PATCH /api/afiliados/:id/aprobar
router.patch('/:id/aprobar', requireAuth, requireRole('admin', 'super_admin'), aprobarAfiliado);

// PATCH /api/afiliados/:id/rechazar
router.patch('/:id/rechazar', requireAuth, requireRole('admin', 'super_admin'), rechazarAfiliado);

export { router as afiliadosRoutes };

