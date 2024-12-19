import { Injectable } from '@nestjs/common';

@Injectable()
export class EvmService {
  getHello(): string {
    return 'Hello World!';
  }
}
