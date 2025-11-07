import { Router } from 'express';
import docente from '../controllers/docente';
import { verificarToken } from '../middleware/auth';
const router = Router();

router.get('/health', docente.getHealth);

// data retrieval routes
router.get('/all', verificarToken, docente.getAll);
router.post('/docentes', verificarToken, docente.getDocentes);
router.get('/:id', verificarToken, docente.getById);

// creating, updating, deleting...
router.post('/create', verificarToken, docente.createDocente);
router.put('/update/:id', verificarToken, docente.updateDocente);
router.delete('/delete/:id', verificarToken, docente.deleteDocente);
export default router;
