import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { User } from '../User';
import { UserTable } from '../UserTable';

describe('User Integration', () => {
  let prismaService: PrismaService;
  let user: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();
    user = new User(`test-${Date.now()}@example.com`, 'Integration User');
  });

  afterAll(async () => {
    await prismaService.user.deleteMany({});
    await prismaService.$disconnect();
  });

  it('should save the user to the database', async () => {
    await new UserTable(prismaService).save(user);

    // Optionally verify the data is persisted
    const savedUser = await prismaService.user.findUnique({
      where: { email: user.email() },
    });

    expect(savedUser).toMatchObject({
      email: user.email(),
      name: 'Integration User',
    });
  });

  it('should find a user by email', async () => {
    await new UserTable(prismaService).save(user);
    const foundUser = await user.userByEmail(prismaService);
    expect(foundUser).toBeTruthy();
    expect(foundUser?.email()).toBe(user.email());
  });
});
