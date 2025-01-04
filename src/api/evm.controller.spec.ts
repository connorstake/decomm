import { Test, TestingModule } from '@nestjs/testing';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';
import { ConfigModule } from '@nestjs/config';
import { TokenVerifyModule } from '../token-verify/token-verify.module';
import { TokenVerifyService } from '../token-verify/token-verify.service';

describe('AppController', () => {
  let controller: EvmController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TokenVerifyModule, ConfigModule],
      controllers: [EvmController],
      providers: [EvmService, TokenVerifyService],
    }).compile();

    controller = app.get<EvmController>(EvmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
