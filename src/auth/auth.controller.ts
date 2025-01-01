import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google-auth')
  @Redirect()
  async googleAuth(): Promise<{ url: string }> {
    return this.authService.googleAuth();
  }

  @Get('google/callback')
  @Redirect()
  async googleAuthCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    console.log('Authorization code received:', code);
    const { email, refreshToken, accessToken } =
      await this.authService.getAuthClientData(code);
    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    console.log('DONE! ', email, refreshToken, accessToken);
    res.redirect('http://localhost:3000/dashboard');
  }
}
