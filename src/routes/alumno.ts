import { Router } from 'express';
import alumno from '../controllers/alumno';
import { verificarToken } from '../middleware/auth';
const router = Router();

router.get('/health', alumno.getHealth);

router.get('/all', verificarToken, alumno.getAll);
router.get('/creditos-report', verificarToken, alumno.getAllCreditosReport);
router.post('/alumnos', verificarToken, alumno.getAlumnos);
router.post('/create', verificarToken, alumno.createAlumno);

router.get('/:id', verificarToken, alumno.getById);
router.put('/update/:id', verificarToken, alumno.updateAlumno);
router.delete('/delete/:id', verificarToken, alumno.deleteAlumno);

export default router;