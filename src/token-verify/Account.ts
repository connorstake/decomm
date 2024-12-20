import { ethers, JsonRpcProvider } from 'ethers';
import { NFTOwnerhshipDetails } from './types/NftOwnershipDetailsType';
import { IAccount } from './interfaces/IAccount';

export class Account implements IAccount {
  private readonly accountAddress: string;
  private readonly provider: JsonRpcProvider;

  constructor(address: string, provider: JsonRpcProvider) {
    this.accountAddress = address;
    this.provider = provider;
  }

  address(): string {
    return this.accountAddress;
  }

  async holding(nft: INFT): Promise<NFTOwnerhshipDetails> {
    const contract = new ethers.Contract(
      nft.collectionAddress(),
      nft.abi(),
      this.provider,
    );
    const balance = await contract.balanceOf(this.accountAddress);
    const owned = balance > 0;
    return {
      owned,
      amountOwned: Number(balance),
    };
  }
}
