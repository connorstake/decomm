import { ethers, JsonRpcProvider } from 'ethers';

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

  async holding(nft: INFT): Promise<boolean> {
    const contract = new ethers.Contract(
      nft.collectionAddress(),
      nft.abi(),
      this.provider,
    );
    const balance = await contract.balanceOf(this.accountAddress);
    return balance > 0;
  }
}
