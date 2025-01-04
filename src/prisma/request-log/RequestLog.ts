import { IRequestLog } from './interfaces/IRequestLog';

export class RequestLog implements IRequestLog {
  constructor(
    private readonly _id: string,
    private readonly _apiKeyId: string,
    private readonly _ipHash: string,
    private readonly _endpoint: string,
    private readonly _method: string,
  ) {}

  id(): string {
    return this._id;
  }

  apiKeyId(): string {
    return this._apiKeyId;
  }

  ipHash(): string {
    return this._ipHash;
  }

  endpoint(): string {
    return this._endpoint;
  }

  method(): string {
    return this._method;
  }
}
