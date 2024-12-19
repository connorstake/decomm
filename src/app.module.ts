import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvmModule } from './evm/evm.module';

@Module({
  imports: [EvmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
