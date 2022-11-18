import { Request, Response } from 'express';
import { TransferType } from '../interfaces/ITransferData';
import AccountService from '../services/AccountService';

export default class AccountController {
  private service: AccountService;
  
  constructor() {
    this.service = new AccountService();
  }
  public newTransfer = async (req: Request, res: Response) => {
    const { username, amount } = req.body;
    const response = await this.service
      .newTransfer(res.locals.user.username, username, amount);
    return res.status(200).json(response);
  };
  public getTransferHistory = async (req: Request, res: Response) => {
    const { date } = req.query;
    const userId = res.locals.user.accountId;
    if (date) {
      const response = await this.service
        .getAllTransferHistoryByDate(userId, '2022-11-17');
      return res.status(200).json(response);
    } 
    const response = await this.service
      .getAllTransferHistory(userId);
  
    return res.status(200).json(response);
  };
  public getTransferHistoryByType = async (req: Request, res: Response) => {
    const userId = res.locals.user.accountId;
    const { type } = req.params;
    const { date } = req.query;
    
    if (date) {
      const response = await this.service
        .getTransferHistoryByTypeAndDate(
          userId,
          type as TransferType,
          date as string,
        );
      return res.status(200).json(response);
    } 
    const response = await this.service
      .getTransferHistoryByType(userId, type as TransferType);
  
    return res.status(200).json(response);
  };
}