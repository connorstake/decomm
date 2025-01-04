import { IRequestLog } from './IRequestLog';

export interface IRequestLogTable {
  save(
    userId: string | null,
    apiKeyId: string | null,
    ipHash: string | null,
    endpoint: string,
    method: string,
  ): Promise<void>;
}
