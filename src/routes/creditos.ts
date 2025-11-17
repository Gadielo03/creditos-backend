import { Router } from 'express';
import creditoControllers from '../controllers/creditos';
import { verificarToken } from '../middleware/auth';
const router = Router();

router.get('/all', verificarToken, creditoControllers.getAllCreditos);
router.get('/:id', verificarToken, creditoControllers.getCreditoById);
router.get('/alumno/:id', verificarToken, creditoControllers.getCreditoByAlumno);
router.post('/create', verificarToken, creditoControllers.createCredito);
router.post('/update', verificarToken, creditoControllers.updateCredito);
router.delete('/delete/:id', verificarToken, creditoControllers.deleteCredito);

export default router;