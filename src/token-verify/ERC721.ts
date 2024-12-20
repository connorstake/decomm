export class ERC721 implements INFT {
  private readonly contractAddress: string;
  private readonly ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  ];

  constructor(contractAddress: string) {
    this.contractAddress = contractAddress;
  }

  collectionAddress(): string {
    return this.contractAddress;
  }

  abi(): string[] {
    return this.ABI;
  }
}
