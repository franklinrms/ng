import prisma from '../database/prisma';
import HttpException from '../lib/HttpException';

export default class AccountService {
  public createAccount = async () => {
    const { id } = await prisma.account.create({ data: {} });
    return id;
  };
  private getAccount = async (username: string) => {
    const user = await prisma.user.findFirst({
      where: { 
        username: {
          equals: username,
          mode: 'insensitive', 
        } },
      include: { account: true },
    });
    if (!user) { throw new HttpException(404, 'User not found'); }

    return { accountId: user.accountId, balance: user.account.balance };
  };
  
  private updateBalance = async (id: string, value: number) => (
    prisma.account.update({
      where: { id },
      data: { balance: value },
    }));

  public newTransfer = async (from: string, to: string, amount: number) => {
    if (amount < 1 || from === to) { 
      throw new HttpException(409, 'Invalid transfer'); 
    }

    const sendingUser = await this.getAccount(from);
    const receivingUser = await this.getAccount(to);

    if (sendingUser.balance < amount) {
      throw new HttpException(409, 'Insufficient funds'); 
    }

    const cashOut = sendingUser.balance - amount;
    const cashIn = sendingUser.balance + amount;

    Promise.all([
      this.updateBalance(sendingUser.accountId, cashOut),

      this.updateBalance(receivingUser.accountId, cashIn),

      prisma.transaction.create({ data: {
        debitedAccountId: sendingUser.accountId,
        creditedAccountId: receivingUser.accountId,
        value: amount } }),
    ]);
  };
}