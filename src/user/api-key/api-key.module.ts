import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  providers: [],
  controllers: [],
  imports: [PrismaModule, ApiKeyModule],
})
export class ApiKeyModule {}
