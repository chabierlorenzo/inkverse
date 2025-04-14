import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de seguridad global
  app.use(helmet());

  // Configuración de CORS
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     const allowedOrigins = [
  //       'http://localhost:4200',
  //       'https://sintinta.com',
  //       'https://pre.sintinta.com',
  //     ];

  //     if (
  //       !origin ||
  //       allowedOrigins.includes(origin) ||
  //       /\.sintinta\.com$/.test(origin)
  //     ) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error(`Not allowed by CORS: ${origin}`));
  //     }
  //   },
  //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: [
  //     'Content-Type',
  //     'Authorization',
  //     'Accept',
  //     'Origin',
  //     'X-Requested-With',
  //     'X-Forwarded-For',
  //     'X-Real-IP',
  //   ],
  //   exposedHeaders: ['Content-Length', 'Content-Type'],
  //   credentials: true,
  //   maxAge: 3600,
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // });


  app.enableCors({
    origin: [
      'http://localhost:4200',
      /\.sintinta\.com$/,
      'https://sintinta.com',
      'https://pre.sintinta.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Permite el envío de cookies si es necesario
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
