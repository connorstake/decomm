export interface IApiKey {
  hash(): Promise<string>;
  userId(): string;
  value(): string;
}
