import { SubscriptionType } from '@prisma/client';
import { Request } from 'express';

export interface IUserRequest extends Request {
  userId: string;
  subscriptionType: SubscriptionType;
  iat: number;
  exp: number;
}
