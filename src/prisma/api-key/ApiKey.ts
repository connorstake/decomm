import * as bcrypt from 'bcrypt';
import { IApiKey } from './interfaces/IApiKey';

export default class ApiKey implements IApiKey {
  constructor(
    private readonly _apiKey: string,
    private readonly _userId: string,
  ) {}

  async hash(): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(this._apiKey, saltRounds);
  }

  value(): string {
    return this._apiKey;
  }

  userId(): string {
    return this._userId;
  }
}
