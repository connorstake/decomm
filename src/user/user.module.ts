import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserTable } from '../prisma/user/UserTable';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKeyModule } from './api-key/api-key.module';
import { ApiKeyController } from './api-key/api-key.controller';

@Module({
  providers: [UserTable, PrismaService],
  controllers: [UserController, ApiKeyController],
  imports: [ConfigModule, ApiKeyModule],
})
export class UserModule {}
