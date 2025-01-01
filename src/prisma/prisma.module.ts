import { Module } from '@nestjs/common';
import { UserTable } from './user/UserTable';
import { PrismaService } from './prisma.service';
import { User } from './user/User';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UserTable, User],
  exports: [PrismaService, UserTable, User],
})
export class PrismaModule {}
