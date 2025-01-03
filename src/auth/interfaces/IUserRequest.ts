import { Request } from 'express';

export interface IUserRequest extends Request {
  userId: string;
  iat: number;
  exp: number;
}
