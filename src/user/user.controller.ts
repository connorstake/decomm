import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { UserTable } from '../prisma/user/UserTable';

@Controller('/user')
export class UserController {
  constructor(private readonly userTable: UserTable) {}

  @Get()
  async getUser(@Req() req: any) {
    const userId = req.user.userId; // Extracted from JWT by middleware
    const user = await this.userTable.user({ id: userId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { email: user.email, name: user.name, id: userId };
  }
}
