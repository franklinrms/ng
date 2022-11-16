import { Router } from 'express';
import checkLoginInput from '../middlewares/checkLoginInput';
import UserController from '../controllers/UserController';
import authToken from '../middlewares/authToken';
import AccountService from '../services/AccountService';

const router = Router();

const userController = new UserController();
const testTransfer = new AccountService();

router.post('/register', checkLoginInput, userController.newUser);
router.post('/login', checkLoginInput, userController.findUser);

router.get('/user', authToken, userController.getUser);

router.get('/transfer', authToken, async (req, res) => {
  const test = await testTransfer
    .newTransfer(res.locals.user.username, 'franklin4', 75.7);
  res.status(200).json(test);
});

export default router;