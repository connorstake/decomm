import { User } from '../User';
import { PrismaService } from '../../prisma.service';
import { UserTable } from '../UserTable';

describe('User', () => {
  let user: User;
  let prismaServiceMock: PrismaService;

  beforeEach(() => {
    prismaServiceMock = {} as PrismaService;
    user = new User('test@example.com', 'Test User', 'google', '12345');
  });

  it('should return the correct email', () => {
    expect(user.email()).toBe('test@example.com');
  });

  it('should return the correct name', () => {
    expect(user.name()).toBe('Test User');
  });

  it('should return the correct provider', () => {
    expect(user.provider()).toBe('google');
  });

  it('should return the correct providerId', () => {
    expect(user.providerId()).toBe('12345');
  });
});
