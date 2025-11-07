import { Router } from 'express';
import alumno from './alumno';
import usuario from './usuario';
import docente from './docente';

const router = Router();

router.use('/alumno', alumno);
router.use('/usuario', usuario);
router.use('/docente', docente);

export default router;