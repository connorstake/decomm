import { SubscriptionType } from '@prisma/client';

export interface IUser {
  email(): string;
  name(): string;
  subscriptionType(): SubscriptionType;
}
