import { NFTOwnerhshipDetails } from '../types/NftOwnershipDetailsType';

export interface IAccount {
  address(): string;
  holding(nft: INFT): Promise<NFTOwnerhshipDetails>;
}
