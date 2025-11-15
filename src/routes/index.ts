import { Router } from 'express';
import alumno from './alumno';
import usuario from './usuario';
import docente from './docente';
import periodo from './periodo';
import actividades from './actividades';

const router = Router();

router.use('/alumno', alumno);
router.use('/usuario', usuario);
router.use('/docente', docente);
router.use('/periodo', periodo);
router.use('/actividades', actividades);

export default router;