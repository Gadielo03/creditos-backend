import { Router } from 'express';
import alumno from './alumno';
import usuario from './usuario';
import docente from './docente';
import periodo from './periodo';

const router = Router();

router.use('/alumno', alumno);
router.use('/usuario', usuario);
router.use('/docente', docente);
router.use('/periodo', periodo);

export default router;