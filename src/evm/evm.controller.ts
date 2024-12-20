import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { EvmService } from './evm.service';
import { TokenVerifyService } from 'src/token-verify/token-verify.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OwnershipCheckRequestDto } from './dto/ownershipCheckRequest.dto';
import { OwnershipCheckResponseDto } from './dto/ownershipCheckResponse.dto';

@Controller()
export class EvmController {
  constructor(
    private readonly evmService: EvmService,
    private readonly tokenVerifyService: TokenVerifyService,
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
  ): Promise<OwnershipCheckResponseDto> {
    const res = await this.tokenVerifyService.verifyOwnership(
      ownershipCheckRequestDto.accountAddress,
      ownershipCheckRequestDto.contractAddress,
    );
    return {
      owned: res,
    };
  }
}
