import { Injectable } from '@nestjs/common';
import { GoogleService } from './strategies/google.strategy';
import { User } from 'src/prisma/user/User';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

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
    const clientData = await this.googleService.getAuthClientData(code);
    const jwt = await this.handleGoogleAuth(clientData.email);
    return { ...clientData, accessToken: jwt };
  }

  // Handle first-time or returning sign-in
  async handleGoogleAuth(email: string): Promise<string> {
    // Check if user exists
    let user = await this.prismaService.user.findUnique({ where: { email } });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await this.prismaService.user.create({
        data: { email, name: '' },
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secretjwttest', // Use a secure secret
      { expiresIn: '1h' }, // Token expires in 1 hour
    );

    return token;
  }
}
