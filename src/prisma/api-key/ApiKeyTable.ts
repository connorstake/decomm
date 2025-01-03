import { PrismaService } from '../prisma.service';
import { IApiKey } from './interfaces/IApiKey';
import { IApiKeyTable } from './interfaces/IApiKeyTable';

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
}
