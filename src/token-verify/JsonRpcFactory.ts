import { ConfigService } from '@nestjs/config';
import { JsonRpcProvider } from 'ethers';

export class JsonRpcFactory {
  private chainId: string;
  constructor(chainId: string, private readonly configService: ConfigService) {
    this.chainId = chainId;
  }

  new(): JsonRpcProvider {
    switch (this.chainId) {
      case '1':
        return new JsonRpcProvider(
          this.configService.get<string>('MAINNET_RPC_URL'),
        );
      case '11155111':
        return new JsonRpcProvider(
          this.configService.get<string>('SEPOLIA_RPC_URL'),
        );
      default:
        throw new Error('Unsupported chain id. received: ' + this.chainId);
    }
  }
}
