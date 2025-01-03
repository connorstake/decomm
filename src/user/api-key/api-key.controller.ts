import {
  Controller,
  HttpCode,
  Post,
  Param,
  Get,
  Delete,
  Request,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import ApiKeyFactory from '../../prisma/api-key/ApiKeyFactory';
import { ApiKeyTable } from '../../prisma/api-key/ApiKeyTable';
import { PrismaService } from '../../prisma/prisma.service';
import { IUserRequest } from '../../auth/interfaces/IUserRequest';

@Controller('/user/key')
export class ApiKeyController {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOperation({
    description: 'Creates a new API key for a user',
  })
  @HttpCode(201)
  @Post()
  async createApiKey(@Request() req: IUserRequest): Promise<void> {
    const apiKey = ApiKeyFactory.new(req.userId);
    return await new ApiKeyTable(this.prismaService).save(apiKey);
  }

  @ApiOperation({
    description: 'Obtains a list of API keys for a user',
  })
  @HttpCode(200)
  @Get()
  async getApiKeys(@Request() req: IUserRequest): Promise<string[]> {
    return await new ApiKeyTable(this.prismaService).apiKeysByUserId(
      req.userId,
    );
  }

  @ApiOperation({
    description: 'Deletes an API key for a user',
  })
  @HttpCode(200)
  @Delete('/:keyId')
  async deleteApiKey(
    @Request() req: IUserRequest,
    @Param('keyId') keyId: string,
  ): Promise<void> {
    return await new ApiKeyTable(this.prismaService).revoke(req.userId, keyId);
  }
}
