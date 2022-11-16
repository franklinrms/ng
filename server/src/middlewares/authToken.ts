import { NextFunction, Request, Response } from 'express';
import { decode } from '../lib/jwt';

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';

  const validated = decode(token);

  res.locals.user = validated;

  next();
};

export default authToken;