import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { RepoModule } from './mcs/repo/repo.module';
import envConfig from './config/env.config';
import { MobileModule } from './mcs/mobile/mobile.module';
import { AdminModule } from './mcs/admin/admin.module';
import { routes } from './routes';
import { AppController } from './app.controller';
import { MailModule } from './mcs/mail/mail.module';
import { CommonModule } from './mcs/common/common.module';
import { UploadModule } from './mcs/upload/upload.module';
import { env } from '~/config/env.config';
import { AuthModule } from './mcs/auth/auth.module';
import { sessionConfig } from './utils/sessionUtils';
import * as session from 'express-session';
import * as connectMssql from 'connect-mssql';

const mssqlClient = connectMssql(session);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${env().NODE_ENV}`,
      load: [envConfig],
    }),
    RepoModule.forRoot({
      user: env().DB_USER,
      password: env().DB_PWD,
      database: env().DB_NAME,
      server: env().DB_SERVER,
      port: env().DB_PORT,
      pool: {
        max: env().DB_POOL_MAX,
        min: env().DB_POOL_MIN,
        idleTimeoutMillis: env().DB_IDLE_TIMEOUT,
      },
      options: {
        encrypt: false,
        trustServerCertificate: false,
      },
    }),
    MailModule.forRoot({
      service: env().NODEMAILER_SERVICE,
      host: env().NODEMAILER_HOST,
      port: env().NODEMAILER_PORT,
      smtpUser: env().NODEMAILER_USER,
      smtpPwd: env().NODEMAILER_PASSWORD,
      fromEmail: env().NODEMAILER_FROM_EMAIL,
    }),
    UploadModule.forRoot({
      accessKeyId: env().AWS_S3_ACCKEY,
      bucketName: env().AWS_S3_BUCKET_NAME,
      secretAccessKey: env().AWS_S3_SECRET,
      baseUrl: env().AWS_S3_BASE_URL,
    }),
    MobileModule,
    AdminModule,
    CommonModule,
    AuthModule,
    RouterModule.register(routes),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(envConfig.KEY)
    private env: ConfigType<typeof envConfig>,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    // session 설정
    consumer.apply(session(sessionConfig(mssqlClient, this.env))).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
