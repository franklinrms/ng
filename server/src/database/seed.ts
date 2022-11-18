import prisma from './prisma';
import AccountService from '../services/AccountService';
import UserService from '../services/UserService';

const { newTransfer } = new AccountService();
const { createUser } = new UserService();

const seedDatabase = async () => {
  await createUser({ username: 'userA', password: 'A1password' });
  await createUser({ username: 'userB', password: 'B1password' });
  await createUser({ username: 'userC', password: 'C1password' });

  const users = await prisma.user.findMany();

  // verificar erro da atualização do saldo

//   await newTransfer(users[0].username, users[1].username, 10);
//   await newTransfer(users[1].username, users[2].username, 10);
//   await newTransfer(users[2].username, users[0].username, 10);
//   await newTransfer(users[2].username, users[1].username, 10);
//   await newTransfer(users[2].username, users[0].username, 10);
//   await newTransfer(users[0].username, users[1].username, 10);
};

seedDatabase();
