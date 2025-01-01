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

  public address(): string {
    return this.accountAddress;
  }

  public async holding(nft: INFT): Promise<NFTOwnerhshipDetails> {
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
      ids: await this.uniqueIds(),
      contractAddress: nft.collectionAddress(),
    };
  }

  private async uniqueIds(): Promise<string[]> {
    return [];
  }
}
