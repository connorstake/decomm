import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { EvmService } from './evm.service';
import { TokenVerifyService } from '../token-verify/token-verify.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OwnershipCheckRequestDto } from './dto/ownershipCheckRequest.dto';
import { OwnershipCheckResponseDto } from './dto/ownershipCheckResponse.dto';
import { Account } from '../token-verify/Account';
import { ERC721 } from '../token-verify/ERC721';
import { ConfigService } from '@nestjs/config';
import { JsonRpcProvider } from 'ethers';
import { JsonRpcFactory } from 'src/token-verify/JsonRpcFactory';

@Controller('/api')
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
    const provider = new JsonRpcFactory(
      ownershipCheckRequestDto.chainId,
      this.configService,
    ).new();

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
