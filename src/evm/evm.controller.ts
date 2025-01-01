import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { EvmService } from './evm.service';
import { TokenVerifyService } from 'src/token-verify/token-verify.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OwnershipCheckRequestDto } from './dto/ownershipCheckRequest.dto';
import { OwnershipCheckResponseDto } from './dto/ownershipCheckResponse.dto';
import { Account } from 'src/token-verify/Account';
import { ERC721 } from 'src/token-verify/ERC721';
import { ConfigService } from '@nestjs/config';
import { JsonRpcApiProvider, JsonRpcProvider } from 'ethers';

@Controller()
export class EvmController {
  constructor(
    private readonly evmService: EvmService,
    private readonly tokenVerifyService: TokenVerifyService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.evmService.getHello();
  }

  @ApiOperation({
    description:
      'Returns a boolean determining whether a provided account owns any NFTs of a specified collection',
  })
  @ApiResponse({
    description:
      'The account has been successfully checked for ownership of any of a specified NFT collection',
    type: OwnershipCheckResponseDto,
  })
  @HttpCode(200)
  @Post('owner')
  async verifyOwnership(
    @Body() ownershipCheckRequestDto: OwnershipCheckRequestDto,
  ): Promise<OwnershipCheckResponseDto[]> {
    const rpcUrl = this.configService.get<string>('MAINNET_RPC_URL');
    const provider = new JsonRpcProvider(rpcUrl);
    const account = new Account(
      ownershipCheckRequestDto.accountAddress,
      provider,
    );
    const nfts = ownershipCheckRequestDto.contractAddresses.map(
      (address: string) => {
        return new ERC721(address);
      },
    );
    const res = await this.tokenVerifyService.verifyMultipleOwnership(
      account,
      nfts,
    );
    return res;
  }
}
