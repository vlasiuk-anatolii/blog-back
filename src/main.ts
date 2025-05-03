import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
    exposedHeaders: 'X-Total-Count, Content-Range',
  });
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<string>('PORT');
  await app.listen(port);
}

void bootstrap();
