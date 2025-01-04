export interface IRequestLog {
  id(): string;
  apiKeyId(): string;
  ipHash(): string;
  endpoint(): string;
  method(): string;
}
