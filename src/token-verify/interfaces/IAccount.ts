interface IAccount {
  address(): string;
  holding(nft: INFT): Promise<boolean>;
}
