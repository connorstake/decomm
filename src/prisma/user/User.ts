import { SubscriptionType } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { IUser } from './interfaces/IUser';
import { UserTable } from './UserTable';

export class User implements IUser {
  private _email: string;
  private _name: string;
  private _subscriptionType: SubscriptionType;

  constructor(email: string, name: string, subscriptionType: SubscriptionType) {
    this._email = email;
    this._name = name;
    this._subscriptionType = subscriptionType;
  }

  public email(): string {
    return this._email;
  }
  public name(): string {
    return this._name;
  }
  public subscriptionType(): SubscriptionType {
    return this._subscriptionType;
  }

  public async userByEmail(prismaService: PrismaService): Promise<User | null> {
    const response = await new UserTable(prismaService).user({
      email: this.email(),
    });
    if (!response) {
      return null;
    }
    return new User(response.email, response.name!, response.subscriptionType!);
  }
}
