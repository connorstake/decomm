import ApiKey from '../ApiKey';
import { IApiKey } from './IApiKey';

export interface IApiKeyTable {
  save(apiKey: IApiKey): Promise<void>;
  apiKeysByUserId(userId: string): Promise<string[]>;
}
