import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IRequestLogTable } from './interfaces/IRequestLogTable';

@Injectable()
export class RequestLogTable implements IRequestLogTable {
  constructor(private readonly prismaService: PrismaService) {}

  async save(
    userId: string | null,
    apiKeyId: string | null,
    ipHash: string | null,
    endpoint: string,
    method: string,
  ): Promise<void> {
    await this.prismaService.requestLog.create({
      data: {
        apiKeyId: apiKeyId,
        userId: userId,
        ipHash: ipHash,
        endpoint: endpoint,
        method: method,
      },
    });
  }
}
