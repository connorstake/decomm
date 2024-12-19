import { Controller, Get } from '@nestjs/common';
import { EvmService } from './evm.service';

@Controller()
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get()
  getHello(): string {
    return this.evmService.getHello();
  }
}
