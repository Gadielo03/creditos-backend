import { Router } from 'express';
import alumno from './alumno';
import usuario from './usuario';

const router = Router();

router.use('/alumno', alumno);
router.use('/usuario', usuario);

export default router;