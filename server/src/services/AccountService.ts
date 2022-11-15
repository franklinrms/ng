import prisma from '../database/prisma';

export default class AccountService {
  public createAccount = async () => {
    const { id } = await prisma.account.create({ data: {} });
    return id;
  };
  public getAccount = async (id: string) => {
    const account = await prisma.account.findUnique({ where: { id },
      include: { User: true } });
    return account;
  };
  public updateBalance = async (id: string, value: number) => {
    const account = await prisma.account.update({
      where: { id },
      data: { balance: value },
    });
    return account;
  };
}