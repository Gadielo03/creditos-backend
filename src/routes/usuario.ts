import { Router } from 'express';
import usuario from '../controllers/usuario';

const router = Router();

router.post('/login', usuario.login);
router.post('/create', usuario.createUser);
router.get('/allUsers', usuario.getAllUsers);
router.post('/usersByIds', usuario.getUsuarios);
router.post('/updatePassword', usuario.updateUserPassword);
router.post('/updateUserInfo', usuario.updateUserInfo);
router.delete('/delete/:id', usuario.deleteUser);
router.get('/roles', usuario.getRoles);
export default router;
