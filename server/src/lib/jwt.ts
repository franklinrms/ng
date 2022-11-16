import { sign, verify } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import HttpException from './HttpException';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const encode = (payload: IUser): string => sign(payload, SECRET, {
  algorithm: 'HS256',
  expiresIn: '24h',
});

export const decode = (token: string) => {
  if (!token) {
    throw new HttpException(401, 'Token not found');
  }
  try {
    return verify(token, SECRET);
  } catch (e) {
    throw new HttpException(401, 'Expired or invalid token');
  }
};