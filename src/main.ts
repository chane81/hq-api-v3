import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/exception.filter.util';
import { ValidationPipe } from '@nestjs/common';
import envConfig from './config/env.config';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

// config type
type TConfigServiceType = ConfigService<ConfigType<typeof envConfig>>;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get<TConfigServiceType>(ConfigService);

  // sentry 설정
  Sentry.init({
    dsn: config.get('SENTRY_DSN'),
    sampleRate: 1.0,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  // cors
  // cors 설정
  const originUrls: string = config.get('ORIGIN_URL');
  const whitelist = originUrls?.split(',');

  app.enableCors({
    credentials: true,
    origin: (reqOrigin, callback) => {
      if (!reqOrigin || whitelist.includes(reqOrigin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
  });

  await app.listen(config.get('PORT'));
};
bootstrap();
