import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { NFTOwnerhshipDetails } from './types/NftOwnershipDetailsType';
import { IAccount } from './interfaces/IAccount';

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
    account: IAccount,
    nft: INFT,
  ): Promise<NFTOwnerhshipDetails> {
    const result = await account.holding(nft);
    return result;
  }

  async verifyMultipleOwnership(
    account: IAccount,
    nfts: INFT[],
  ): Promise<NFTOwnerhshipDetails[]> {
    const result = nfts.map((nft) => {
      const holdingDetails = account.holding(nft);
      return holdingDetails;
    });
    return await Promise.all(result);
  }
}
