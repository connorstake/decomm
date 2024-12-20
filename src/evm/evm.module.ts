import { Module } from '@nestjs/common';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';
import { TokenVerifyModule } from 'src/token-verify/token-verify.module';
import { TokenVerifyService } from 'src/token-verify/token-verify.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TokenVerifyModule, ConfigModule],
  controllers: [EvmController],
  providers: [EvmService, TokenVerifyService],
})
export class EvmModule {}
