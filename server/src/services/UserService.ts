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

  private getUserByUsername = async (username: string) => prisma.user
    .findFirst({
      where: { 
        username: {
          equals: username,
          mode: 'insensitive', 
        } },
    });

  private checkPassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!regex.test(password)) {
      throw new HttpException(400, 'Invalid password');
    }
    return regex.test(password); 
  };
  private checkUsername = async (username: string) => {
    const nameAlreadyRegistered = await this.getUserByUsername(username);
    if (nameAlreadyRegistered) {
      throw new HttpException(409, 'Username already registered');
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
  public findUser = async ({ username, password }: ILoginInput) => {
    const user = await this.getUserByUsername(username);
    if (!user) { throw new HttpException(404, 'User not found'); }

    if (user.password === md5(password)) {
      return encode({ username: user.username, accountId: user.accountId });
    } 
    throw new HttpException(404, 'Invalid password');
  };
  public getUser = async (username: string) => {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { account: true },
    });
    if (!user) { throw new HttpException(404, 'User not found'); }
    return { username: user.username, balance: user.account.balance };
  };
}