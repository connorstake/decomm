import { Prisma, User } from '@prisma/client';

export interface IUserTable {
  user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
  users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]>;
  save(data: Prisma.UserCreateInput): Promise<void>;
  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<void>;
  delete(where: Prisma.UserWhereUniqueInput): Promise<void>;
}
