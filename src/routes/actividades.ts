import { Router } from 'express';
import actividades from '../controllers/actividades';
import { verificarToken } from '../middleware/auth';
const router = Router();

router.get('/all', verificarToken, actividades.getAllActividades);
router.post('/create', verificarToken, actividades.createActividad);
router.post('/update', verificarToken, actividades.updateActividad);
router.get('/:id', verificarToken, actividades.getActividadById);
router.delete('/:id', verificarToken, actividades.deleteActividad);

export default router;