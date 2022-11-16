import { Router } from 'express';
import checkLoginInput from '../middlewares/checkLoginInput';
import UserController from '../controllers/UserController';
import authToken from '../middlewares/authToken';

const router = Router();

const userController = new UserController();

router.post('/register', checkLoginInput, userController.newUser);
router.post('/login', checkLoginInput, userController.findUser);

router.get('/user', authToken, userController.getUser);

export default router;