import { Router } from 'express';
import UserController from '../controllers/UserController';
import AccountController from '../controllers/AccountController';
import authToken from '../middlewares/authToken';
import checkLoginInput from '../middlewares/checkLoginInput';
import checkTransferInput from '../middlewares/checkTransferInput';

const router = Router();

const userController = new UserController();
const accountController = new AccountController();

router.post('/register', checkLoginInput, userController.newUser);
router.post('/login', checkLoginInput, userController.findUser);

router.get('/user', authToken, userController.getUser);

router.get('/transfer', authToken, accountController.getTransferHistory);

router.get(
  '/transfer/:type',
  authToken,
  accountController.getTransferHistoryByType,
);

router.post(
  '/transfer',
  checkTransferInput,
  authToken,
  accountController.newTransfer,
);

export default router;