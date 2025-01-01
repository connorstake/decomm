import { randomBytes } from 'crypto';
import ApiKey from './ApiKey';

export default class ApiKeyFactory {
  static new(userId: string): ApiKey {
    return new ApiKey(randomBytes(32).toString('hex'), userId);
  }
}
