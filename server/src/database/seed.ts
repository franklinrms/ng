// import AccountService from '../services/AccountService';
import UserService from '../services/UserService';

// const { newTransfer } = new AccountService();
const { createUser } = new UserService();

const users = [
  { username: 'userA', password: 'A1password' },
  { username: 'userB', password: 'B1password' },
  { username: 'userC', password: 'C1password' },
];

const seedDatabase = async () => {
  users.map(async (user) => createUser(user));

  // await newTransfer(users[0].username, users[1].username, 50.59);
  // await newTransfer(users[1].username, users[2].username, 50.59);
  // await newTransfer(users[2].username, users[0].username, 50.59);
};

seedDatabase();
