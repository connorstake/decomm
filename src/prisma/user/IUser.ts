export interface IUser {
  email(): string;
  name(): string;
  provider(): string;
  providerId(): string;
}
