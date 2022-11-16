import { Router } from 'express';
import checkLoginInput from '../middlewares/checkLoginInput';
import UserController from '../controllers/UserController';
import authToken from '../middlewares/authToken';

const router = Router();

const userController = new UserController();

router.post('/register', checkLoginInput, userController.newUser);
router.post('/login', checkLoginInput, userController.findUser);
router.get('/validate', authToken, (req, res) => res.status(200).json({ message: 'Valid token' }));

export default router;