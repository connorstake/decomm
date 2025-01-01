import { User } from '../User';
import { PrismaService } from '../../prisma.service';
import { UserTable } from '../UserTable';

describe('User', () => {
  let user: User;
  let prismaServiceMock: PrismaService;

  beforeEach(() => {
    prismaServiceMock = {} as PrismaService;
    user = new User('test@example.com', 'Test User');
  });

  it('should return the correct email', () => {
    expect(user.email()).toBe('test@example.com');
  });

  it('should return the correct name', () => {
    expect(user.name()).toBe('Test User');
  });
});
