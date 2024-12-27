import { Module } from '@nestjs/common';
import { UserTable } from './user/UserTable';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UserTable],
})
export class PrismaModule {}
