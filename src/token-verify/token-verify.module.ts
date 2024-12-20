import { Module } from '@nestjs/common';
import { TokenVerifyService } from './token-verify.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TokenVerifyService],
  imports: [ConfigModule],
})
export class TokenVerifyModule {}
