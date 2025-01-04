import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleService } from './strategies/google.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../prisma/user/user.module';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiKeyTable } from '../prisma/api-key/ApiKeyTable';
import { RequestLogTable } from '../prisma/request-log/RequestLogTable';

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
  providers: [
    AuthService,
    GoogleService,
    PrismaService,
    ConfigService,
    ApiKeyTable,
    RequestLogTable,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
