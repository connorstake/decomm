// token-verify.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TokenVerifyService } from './token-verify.service';

describe('TokenVerifyService', () => {
  let service: TokenVerifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenVerifyService],
    }).compile();

    service = module.get<TokenVerifyService>(TokenVerifyService);
  });

  it('should return true if the wallet owns an NFT', async () => {
    const result = await service.verifyOwnership(
      '0xE08c32737c021C7d05d116b00a68a02F2d144AC0',
      '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
    );

    expect(result).toBe(true);
  }, 20000);

  it('should return false if the wallet does not own an NFT', async () => {
    const result = await service.verifyOwnership(
      '0xc659080A119e910030210c76BC69165f5d836eD2',
      '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
    );

    expect(result).toBe(false);
  });
});
