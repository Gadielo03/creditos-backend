import { Router } from 'express';
import controllers from '../controllers/periodo';

const router = Router();

router.get('/getAll', controllers.getAllPeriodos);
router.post('/createPeriodo', controllers.createPeriodo);
router.put('/updatePeriodo/:id', controllers.updatePeriodo);
router.delete('/deletePeriodo/:id', controllers.deletePeriodo);

export default router;