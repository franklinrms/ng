import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import HttpException from '../lib/HttpException';

const validateLogin = Joi.object({
  username: Joi.string().min(3).required(),
  amount: Joi.number().min(1).required(),
});

const checkTransferInput = (
  req: Request,
  _res: Response, 
  next: NextFunction,
) => {
  const { error } = validateLogin.validate(req.body);
  
  if (!error) return next();

  throw new HttpException(400, 'All fields must be filled');
};

export default checkTransferInput;