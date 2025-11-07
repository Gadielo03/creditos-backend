import { Router } from 'express';
import alumno from '../controllers/alumno';
const router = Router();

router.get('/health', alumno.getHealth);

// data retrieval routes
router.get('/all', alumno.getAll);
router.post('/alumnos', alumno.getAlumnos);
router.get('/:id', alumno.getById);

// creatign, updating, deleting...
router.post('/create', alumno.createAlumno);
router.put('/update/:id', alumno.updateAlumno);
router.delete('/delete/:id', alumno.deleteAlumno);

export default router;