import { Injectable } from '@nestjs/common';
import { GoogleService } from './strategies/google.strategy';

@Injectable()
export class AuthService {
  constructor(private googleService: GoogleService) {}

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
    let user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      // First-time sign-in: create new user
      user = await this.prismaService.user.create({
        data: {
          email,
          googleRefreshToken: refreshToken,
          googleAccessToken: accessToken,
          // Add other fields if necessary
        },
      });
    } else {
      // Subsequent login: optionally update tokens
      await this.prismaService.user.update({
        where: { email },
        data: {
          googleRefreshToken: refreshToken,
          googleAccessToken: accessToken,
        },
      });
    }

    // Generate a JWT for the user
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
