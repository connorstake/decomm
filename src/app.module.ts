import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvmModule } from './evm/evm.module';
import { TokenVerifyModule } from './token-verify/token-verify.module';

@Module({
  imports: [EvmModule, TokenVerifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
