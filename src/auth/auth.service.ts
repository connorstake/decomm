import { Injectable } from '@nestjs/common';
import { GoogleService } from './strategies/google.strategy';
import { User } from 'src/prisma/user/User';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private googleService: GoogleService,
    private user: User,
    private prismaService: PrismaService,
  ) {}

  async googleAuth(): Promise<{ url: string }> {
    return this.googleService.getOAuth2ClientUrl();
  }

  async getAuthClientData(
    code: string,
  ): Promise<{ email: string; refreshToken: string; accessToken: string }> {
    return this.googleService.getAuthClientData(code);
  }

  // Handle first-time or returning sign-in
  async handleGoogleSignIn(
    email: string,
    refreshToken: string,
    accessToken: string,
  ): Promise<string> {
    // Check if the user exists
    const user = new User(email, '', '', '');

    if (!user) {
      // First-time sign-in: create new user
      await this.user.save(this.prismaService);
    } else {
      // Subsequent login: optionally update tokens
      //   await this.prismaService.user.update({
      //     where: { email },
      //     data: {
      //       googleRefreshToken: refreshToken,
      //       googleAccessToken: accessToken,
      //     },
      //   });
    }

    // Generate a JWT for the user
    // const payload = { email: user.email, sub: user.id };
    // return this.jwtService.sign(payload);

    return 'done';
  }
}
