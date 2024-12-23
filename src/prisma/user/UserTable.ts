import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { IUserTable } from 'src/prisma/user/IUserTable';

@Injectable()
export class UserTable implements IUserTable {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async save(data: Prisma.UserCreateInput): Promise<void> {
    try {
      await this.prisma.user.create({
        data,
      });
    } catch (err) {
      throw new Error(`Unable to save user due to: ${err}`);
    }
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<void> {
    const { where, data } = params;
    await this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.prisma.user.delete({
      where,
    });
  }
}
