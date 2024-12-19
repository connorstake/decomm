import { Test, TestingModule } from '@nestjs/testing';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';

describe('AppController', () => {
  let appController: EvmController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EvmController],
      providers: [EvmService],
    }).compile();

    appController = app.get<EvmController>(EvmController);
  });
});
