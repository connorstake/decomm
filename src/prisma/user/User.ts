import { NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUser } from './IUser';
import { UserTable } from './UserTable';

export class User implements IUser {
  private _email: string;
  private _name: string;
  private _provider: string;
  private _providerId: string;

  constructor(
    email: string,
    name: string,
    provider: string,
    providerId: string,
  ) {
    this._email = email;
    this._name = name;
    this._provider = provider;
    this._providerId = providerId;
  }

  public email(): string {
    return this._email;
  }
  public name(): string {
    return this._name;
  }
  public provider(): string {
    return this._provider;
  }
  public providerId(): string {
    return this._providerId;
  }

  public async save(prismaService: PrismaService): Promise<void> {
    await new UserTable(prismaService).save({
      email: this.email(),
      name: this.name(),
      provider: this.provider(),
      providerId: this.providerId(),
    });
  }

  public async userByEmail(prismaService: PrismaService): Promise<User | null> {
    const response = await new UserTable(prismaService).user({
      email: this.email(),
    });
    if (!response) {
      return null;
    }
    return new User(
      response.email,
      response.name!,
      response.provider!,
      response.providerId!,
    );
  }
}
