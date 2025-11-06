import { Router } from 'express';
import usuario from '../controllers/usuario';

const router = Router();

router.post('/login', usuario.login);

export default router;
