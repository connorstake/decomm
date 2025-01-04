import { Request } from 'express';

export interface IUserApiRequest extends Request {
  userId?: string;
  apiKey?: string;
  ipHash?: string;
}
