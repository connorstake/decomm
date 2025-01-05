import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import ApiKeyFactory from '../ApiKeyFactory';
import { User } from '../../../prisma/user/User';
import ApiKey from '../ApiKey';
import { ApiKeyTable } from '../ApiKeyTable';
import { UserTable } from '../../../prisma/user/UserTable';
import { SubscriptionType } from '@prisma/client';

describe('ApiKey Integration', () => {
  let prismaService: PrismaService;
  let apiKey: ApiKey;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.apiKey.deleteMany({});
    await prismaService.user.deleteMany({});
  });

  afterAll(async () => {
    await prismaService.apiKey.deleteMany({});
    await prismaService.user.deleteMany({});
    await prismaService.$disconnect();
  });

  it('should save the api key to the database', async () => {
    const apiKeyTable = new ApiKeyTable(prismaService);

    const user = new User(
      `12839128481@rmv.com`,
      'Integration User',
      SubscriptionType.STARTER,
    );
    const userTable = await new UserTable(prismaService);

    let foundUser = await userTable.user({
      email: user.email(),
    });

    if (!foundUser) {
      await userTable.save(user);

      foundUser = await userTable.user({
        email: user.email(),
      });
    }

    console.log('foundUser', foundUser);
    apiKey = ApiKeyFactory.new(foundUser!.id);

    console.log('apiKeyUser', apiKey);
    await apiKeyTable.save(apiKey);

    const foundApiKey = await prismaService.apiKey.findFirst({
      where: { key: apiKey.value() },
    });

    expect(foundApiKey).not.toBeNull();
  });

  it('should delete the api key from the database', async () => {
    const apiKeyTable = new ApiKeyTable(prismaService);

    const user = new User(
      `12839128481@rmv.com`,
      'Integration User',
      SubscriptionType.STARTER,
    );
    const userTable = await new UserTable(prismaService);

    let foundUser = await userTable.user({
      email: user.email(),
    });

    if (!foundUser) {
      await userTable.save(user);

      foundUser = await userTable.user({
        email: user.email(),
      });
    }

    apiKey = ApiKeyFactory.new(foundUser!.id);
    await apiKeyTable.save(apiKey);

    const foundApiKey = await prismaService.apiKey.findFirst({
      where: { key: apiKey.value() },
    });

    expect(foundApiKey).not.toBeNull();
    expect(foundApiKey?.revoked).toBeFalsy();
    await apiKeyTable.revoke(foundUser!.id, apiKey.value());

    const updatedApiKey = await prismaService.apiKey.findFirst({
      where: { key: apiKey.value() },
    });
    expect(updatedApiKey?.revoked).toBeTruthy();
  });
});
