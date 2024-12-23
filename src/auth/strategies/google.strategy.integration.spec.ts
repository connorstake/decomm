import { Test, TestingModule } from '@nestjs/testing';
import { GoogleService } from './google.strategy';
import { ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';
dotenv.config();

describe('GoogleService Integration', () => {
  let service: GoogleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleService, ConfigService],
    }).compile();

    service = module.get<GoogleService>(GoogleService);
  });

  it('should generate a valid auth URL', async () => {
    const { url } = await service.getOAuth2ClientUrl();
    console.log('Auth URL:', url);
    expect(url).toContain('https://accounts.google.com/o/oauth2/v2/auth');
  });

  it('should fetch user info with a valid code', async () => {
    const code = 'mock-auth-code-from-google';
    const result = await service.getAuthClientData(code);
    console.log(result);
    expect(result.email).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.accessToken).toBeDefined();
  });
});
