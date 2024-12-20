import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvmModule } from './evm/evm.module';
import { TokenVerifyModule } from './token-verify/token-verify.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EvmModule, TokenVerifyModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
