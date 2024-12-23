import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { UserService } from './prisma/user/UserTable';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<void> {
    // await this.userService.save(userData);
  }
}
