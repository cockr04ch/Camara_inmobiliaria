import { Router } from 'express';
import { registerAfiliado, getAfiliados, aprobarAfiliado, getSolicitudesCibir, rechazarAfiliado } from '../controllers/afiliados.controller.js';

const router = Router();

// GET /api/afiliados
router.get('/', getAfiliados);

// GET /api/afiliados/cibir/solicitudes
router.get('/cibir/solicitudes', getSolicitudesCibir);

// POST /api/afiliados/registro
router.post('/registro', registerAfiliado);

// PATCH /api/afiliados/:id/aprobar
router.patch('/:id/aprobar', aprobarAfiliado);

// PATCH /api/afiliados/:id/rechazar
router.patch('/:id/rechazar', rechazarAfiliado);

export { router as afiliadosRoutes };
