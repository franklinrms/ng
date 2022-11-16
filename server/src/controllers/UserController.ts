import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class MatchController {
  private service: UserService;
  
  constructor() {
    this.service = new UserService();
  }
  
  public newUser = async (req: Request, res: Response) => {
    const response = await this.service.createUser(req.body);
    return res.status(201).json(response);
  };
}