import { Router } from 'express';
import alumno from '../controllers/alumno';
import { verificarToken } from '../middleware/auth';
const router = Router();

router.get('/health', alumno.getHealth);

// data retrieval routes
router.get('/all', verificarToken, alumno.getAll);
router.post('/alumnos', verificarToken, alumno.getAlumnos);
router.get('/:id', verificarToken, alumno.getById);

// creatign, updating, deleting...
router.post('/create', verificarToken, alumno.createAlumno);
router.put('/update/:id', verificarToken, alumno.updateAlumno);
router.delete('/delete/:id', verificarToken, alumno.deleteAlumno);

export default router;