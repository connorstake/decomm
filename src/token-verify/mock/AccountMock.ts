import { JsonRpcProvider } from 'ethers';
import { NFTOwnerhshipDetails } from '../types/NftOwnershipDetailsType';
import { IAccount } from '../interfaces/IAccount';

export class AccountMock implements IAccount {
  private readonly accountAddress: string;
  private readonly provider: JsonRpcProvider;
  private readonly mockHolding: NFTOwnerhshipDetails;

  constructor(
    address: string,
    provider: JsonRpcProvider,
    mockHolding: NFTOwnerhshipDetails,
  ) {
    this.accountAddress = address;
    this.provider = provider;
    this.mockHolding = mockHolding;
  }

  address(): string {
    return this.accountAddress;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async holding(nft: INFT): Promise<NFTOwnerhshipDetails> {
    return this.mockHolding;
  }
}
