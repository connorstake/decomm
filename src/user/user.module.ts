import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserTable } from 'src/prisma/user/UserTable';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserTable, PrismaService],
  controllers: [UserController],
  imports: [ConfigModule],
})
export class UserModule {}
