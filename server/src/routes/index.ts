import { Router } from 'express';
import checkLoginInput from '../middlewares/checkLoginInput';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.post('/register', checkLoginInput, userController.newUser);
router.post('/login', checkLoginInput, userController.findUser);

export default router;