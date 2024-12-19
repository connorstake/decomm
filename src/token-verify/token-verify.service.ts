import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class TokenVerifyService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
  }

  async verifyOwnership(
    walletAddress: string,
    contractAddress: string,
  ): Promise<boolean> {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        ['function balanceOf(address owner) view returns (uint256)'],
        this.provider,
      );

      const balance = await contract.balanceOf(walletAddress);
      return balance.gt(0);
    } catch (error) {
      throw new HttpException(
        `Error verifying ownership: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
