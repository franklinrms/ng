import md5 from 'md5';
import HttpException from '../lib/HttpException';
import prisma from '../database/prisma';
import AccountService from './AccountService';
import { encode } from '../lib/jwt';
import IUser from '../interfaces/IUser';
import ILoginInput from '../interfaces/ILoginInput';

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
    const nameAlreadyRegistered = await prisma.user.findFirst({
      where: { 
        username: {
          equals: username,
          mode: 'insensitive', 
        } },
    });
    if (nameAlreadyRegistered) {
      throw new HttpException(400, 'Username already registered');
    }
    return true;
  };
  public createUser = async ({ username, password }: ILoginInput) => {
    if (this.checkPassword(password) && await this.checkUsername(username)) {
      const user:IUser = await prisma.user.create({ data: {
        username,
        password: md5(password),
        accountId: await this.accountService.createAccount(),
      },
      });
      return encode({ username: user.username, accountId: user.accountId });
    }
  };
}