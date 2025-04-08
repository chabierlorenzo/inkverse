import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de seguridad global
  app.use(helmet());

  // Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://sintinta.com',
      'https://pre.sintinta.com',
      /\.sintinta\.com$/,
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'X-Forwarded-For',
      'X-Real-IP',
    ],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(4004);
}
bootstrap();
