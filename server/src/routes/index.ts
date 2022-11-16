import { Router } from 'express';
import UserService from '../services/UserService';

const router = Router();
const test = new UserService();

// router.put('/test', async (req, res) => {
//   const response = await test
//     .updateBalance('128499b9-08a7-4310-b07b-5fcd2f5cedf2', 1000.99);
//   return res.status(200).json(response);
// });

// router.get('/test', async (req, res) => {
//   const response = await test
//     .getAccount('128499b9-08a7-4310-b07b-5fcd2f5cedf2');
//   return res.status(200).json(response);
// });
router.get('/test', async (req, res) => {
  const response = await test
    .createUser('franklin3', 'Abcdefgh1');
  return res.status(200).json(response);
});

export default router;