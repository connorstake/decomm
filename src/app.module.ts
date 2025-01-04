import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvmModule } from './api/evm.module';
import { TokenVerifyModule } from './token-verify/token-verify.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserModule } from './user/user.module';
import { ApiAuthMiddleware } from './auth/api-auth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { ApiKeyTable } from './prisma/api-key/ApiKeyTable';
import { RequestLogTable } from './prisma/request-log/RequestLogTable';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EvmModule,
    TokenVerifyModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiKeyTable, RequestLogTable],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/user');
    consumer.apply(ApiAuthMiddleware).forRoutes('/api');
  }
}
