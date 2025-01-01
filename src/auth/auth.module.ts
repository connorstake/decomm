import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleService } from './strategies/google.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/prisma/user/user.module';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UserModule,
    ConfigModule,
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  providers: [AuthService, GoogleService, PrismaService, ConfigService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
