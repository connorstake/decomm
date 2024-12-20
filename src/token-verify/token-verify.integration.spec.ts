// token-verify.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TokenVerifyService } from './token-verify.service';
import { AccountMock } from './mock/AccountMock';
import { JsonRpcProvider } from 'ethers';
import { ERC721Mock } from './mock/MockERC721';
import { ConfigModule } from '@nestjs/config';

describe('TokenVerifyService', () => {
  let service: TokenVerifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenVerifyService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<TokenVerifyService>(TokenVerifyService);
  });

  it('should return true if the wallet owns an NFT', async () => {
    const accountMock = new AccountMock('', new JsonRpcProvider(''), {
      owned: true,
      amountOwned: 1,
    });
    const nftMock = new ERC721Mock('');
    const result = await service.verifyOwnership(accountMock, nftMock);

    expect(result.owned).toBe(true);
  });

  it('should return false if the wallet does not own an NFT', async () => {
    const accountMock = new AccountMock('', new JsonRpcProvider(''), {
      owned: false,
      amountOwned: 0,
    });
    const nftMock = new ERC721Mock('');
    const result = await service.verifyOwnership(accountMock, nftMock);

    expect(result.owned).toBe(false);
  });
});
