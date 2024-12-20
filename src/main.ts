import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwagger(app);
  await app.listen(3000);
}

bootstrap();

function initializeSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('TokenVerify')
    .setDescription(
      'Tokinvoice is an API that provides information regarding the current holding status of accounts and NFTs',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3333')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/documentation', app, swaggerDocument);
  Logger.log(
    'API documentation is running on http://localhost:3000/documentation',
  );
}
