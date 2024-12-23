import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google-auth')
  @Redirect()
  async googleAuth(): Promise<{ url: string }> {
    return this.authService.googleAuth();
  }

  @Get('google-callback')
  @Redirect()
  async googleAuthCallback(
    @Query('code') code: string,
  ): Promise<{ accessToken: string }> {
    const { email, refreshToken, accessToken } =
      await this.authService.getAuthClientData(code);
    // Implement additional sign-in logic here
    return { accessToken };
  }
}
