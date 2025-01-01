import { PrismaService } from '../prisma.service';
import { IUser } from './interfaces/IUser';
import { UserTable } from './UserTable';

export class User implements IUser {
  private _email: string;
  private _name: string;

  constructor(email: string, name: string) {
    this._email = email;
    this._name = name;
  }

  public email(): string {
    return this._email;
  }
  public name(): string {
    return this._name;
  }

  public async userByEmail(prismaService: PrismaService): Promise<User | null> {
    const response = await new UserTable(prismaService).user({
      email: this.email(),
    });
    if (!response) {
      return null;
    }
    return new User(response.email, response.name!);
  }
}
