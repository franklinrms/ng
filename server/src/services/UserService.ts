import md5 from 'md5';
import HttpException from '../lib/HttpException';
import prisma from '../database/prisma';
import AccountService from './AccountService';

export default class UserService {
  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  private checkPassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!regex.test(password)) {
      throw new HttpException(400, 'Invalid password');
    }
    return regex.test(password); 
  };
  private checkUsername = async (username: string) => {
    const nameAlreadyRegistered = await prisma.user.findUnique({
      where: { username },
    });
    if (nameAlreadyRegistered) {
      throw new HttpException(400, 'Username already registered');
    }
    return true;
  };
  public createUser = async (username: string, password: string) => {
    if (this.checkPassword(password) && await this.checkUsername(username)) {
      const accountId = await this.accountService.createAccount();
      return prisma.user.create({ data: {
        username,
        password: md5(password),
        accountId,
      } });
    }
  };
}