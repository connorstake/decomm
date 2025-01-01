import { Controller, HttpCode, Post, Param, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import ApiKeyFactory from '../../prisma/api-key/ApiKeyFactory';
import { ApiKeyTable } from '../../prisma/api-key/ApiKeyTable';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('/user/:userId/key')
export class ApiKeyController {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOperation({
    description: 'Creates a new API key for a user',
  })
  @HttpCode(201)
  @Post()
  async createApiKey(@Param('userId') id: string): Promise<void> {
    const apiKey = ApiKeyFactory.new(id);
    return await new ApiKeyTable(this.prismaService).save(apiKey);
  }

  @ApiOperation({
    description: 'Obtains a list of API keys for a user',
  })
  @HttpCode(200)
  @Get()
  async getApiKeys(@Param('userId') id: string): Promise<string[]> {
    return await new ApiKeyTable(this.prismaService).apiKeysByUserId(id);
  }
}
