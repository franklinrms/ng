import { Request, Response } from 'express';
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
  public getAllTransferHistory = async (_req: Request, res: Response) => {
    const response = await this.service
      .getAllTransferHistory(res.locals.user.accountId);
    return res.status(200).json(response);
  };
}