import prisma from '../database/prisma';
import ITransferType, { TransferType } from '../interfaces/ITransferData';
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
    const cashIn = receivingUser.balance + amount;

    Promise.all([
      this.updateBalance(sendingUser.accountId, cashOut),

      this.updateBalance(receivingUser.accountId, cashIn),

      prisma.transaction.create({ data: {
        debitedAccountId: sendingUser.accountId,
        creditedAccountId: receivingUser.accountId,
        value: amount } }),
    ]);
  };

  private getTransferByType = async (id: string, type: string) => (
    prisma.account.findUnique({
      where: { id },
      select: { 
        [type]: {
          select: {
            value: true,
            createdAt: true,
            [type === 'cashIn' ? 'debitedAccount' : 'creditedAccount']: { 
              select: { user: { select: { username: true } } } },
          },
        },
      },
    }));
  public getAllTransferHistory = async (id: string) => {
    const { cashIn } = (
      await this.getTransferByType(id, 'cashIn') as ITransferType
    );

    const { cashOut } = (
      await this.getTransferByType(id, 'cashOut') as ITransferType
    );
    
    if (cashIn !== undefined && cashOut !== undefined) {
      return [...cashIn, ...cashOut];
    }
  };

  private getTransferByTypeAndDate = async (
    id: string, 
    type: string, 
    date:string,
  ) => (prisma.account.findUnique({
    where: { id },
    select: { 
      [type]: {
        where: { createdAt: { 
          gte: `${date}T00:00:00.000Z`, lte: `${date}T23:59:59.000Z` } },
        select: {
          value: true,
          createdAt: true,
          [type === 'cashIn' ? 'debitedAccount' : 'creditedAccount']: { 
            select: { user: { select: { username: true } } } },
        },
      } },
  }));

  public getAllTransferHistoryByDate = async (id: string, date:string) => {
    const { cashIn } = (
      await this.getTransferByTypeAndDate(id, 'cashIn', date) as ITransferType);
  
    const { cashOut } = (
      await this.getTransferByTypeAndDate(id, 'cashOut', date) as ITransferType
    );
  
    if (cashIn !== undefined && cashOut !== undefined) {
      return [...cashIn, ...cashOut];
    }
  };
  public getTransferHistoryByType = async (id: string, type:TransferType) => {
    const data = await this.getTransferByType(id, type) as ITransferType;
    return data[type];
  };
  public getTransferHistoryByTypeAndDate = async (
    id: string,
    type:TransferType, 
    date:string,
  ) => {
    const data = await this
      .getTransferByTypeAndDate(id, type, date) as ITransferType;
    return data[type];
  };
}