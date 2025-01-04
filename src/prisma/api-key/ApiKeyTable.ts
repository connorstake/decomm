import { ApiKey, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { IApiKey } from './interfaces/IApiKey';
import { IApiKeyTable } from './interfaces/IApiKeyTable';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyTable implements IApiKeyTable {
  constructor(private readonly prismaService: PrismaService) {}

  async save(apiKey: IApiKey): Promise<void> {
    // Save the hashed key in the database
    await this.prismaService.apiKey.create({
      data: {
        key: apiKey.value(),
        userId: apiKey.userId(),
      },
    });
  }

  async apiKeysByUserId(userId: string): Promise<string[]> {
    const apiKeys = await this.prismaService.apiKey.findMany({
      where: {
        userId,
        revoked: false,
      },
    });
    return apiKeys.map((apiKey) => apiKey.key);
  }

  async revoke(userId: string, key: string): Promise<void> {
    await this.prismaService.apiKey.update({
      where: {
        key,
        userId,
      },
      data: {
        revoked: true,
      },
    });
  }

  async keyHolder(key: string): Promise<User | null> {
    const apiKey = await this.prismaService.apiKey.findUnique({
      where: { key },
    });

    if (!apiKey) {
      return null;
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: apiKey.userId },
    });

    if (!user) {
      throw Error('User not found for API key: ' + key);
    }

    return user;
  }

  async infoByKey(key: string): Promise<ApiKey | null> {
    return await this.prismaService.apiKey.findUnique({
      where: { key },
    });
  }
}
