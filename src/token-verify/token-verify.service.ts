import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';
import { ERC721 } from './ERC721';
import { Account } from './Account';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenVerifyService {
  private provider: ethers.JsonRpcProvider;
  private configService: ConfigService;

  constructor(private config: ConfigService) {
    // TODO: SHOULD BE DYNAMIC BASED ON CHAIN ID
    this.configService = config;
    this.setProvider();
  }

  setProvider() {
    const rpcUrl = this.configService.get<string>('MAINNET_RPC_URL');
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async verifyOwnership(
    walletAddress: string,
    contractAddress: string,
  ): Promise<boolean> {
    const nft = new ERC721(contractAddress);
    const account = new Account(walletAddress, this.provider);
    const result = await account.holding(nft);
    return result;
  }
}
