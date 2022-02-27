import { registerAs } from '@nestjs/config';

export const env = () => ({
  PORT: +process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // db
  DB_USER: process.env.DB_USER || '',
  DB_PWD: process.env.DB_PWD || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_SERVER: process.env.DB_SERVER || '',
  DB_INSTANCE_NAME: process.env.DB_INSTANCE_NAME || '',
  DB_POOL_MAX: +process.env.DB_PWD || 10,
  DB_POOL_MIN: +process.env.DB_PWD || 5,
  DB_PORT: +process.env.DB_PORT || 1433,
  DB_IDLE_TIMEOUT: +process.env.DB_IDLE_TIMEOUT || 30000,

  // session
  SESSION_TABLE: process.env.SESSION_TABLE || '',
  SESSION_NAME: process.env.SESSION_NAME || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  SESSION_EXPIRES: +process.env.SESSION_EXPIRES || 86400000,
  SESSION_DOMAIN: process.env.SESSION_DOMAIN || '',

  // cors
  ORIGIN_URL: process.env.ORIGIN_URL || '',

  // mail
  NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE || '',
  NODEMAILER_HOST: process.env.NODEMAILER_HOST || '',
  NODEMAILER_PORT: +process.env.NODEMAILER_PORT || 587,
  NODEMAILER_USER: process.env.NODEMAILER_USER || '',
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD || '',
  NODEMAILER_FROM_EMAIL: process.env.NODEMAILER_FROM_EMAIL || '',

  // aws
  AWS_S3_ACCKEY: process.env.AWS_S3_ACCKEY || '',
  AWS_S3_SECRET: process.env.AWS_S3_SECRET || '',
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
  AWS_S3_BASE_URL: process.env.AWS_S3_BASE_URL || '',

  // sentry
  SENTRY_DSN: process.env.SENTRY_DSN || '',
});

export default registerAs('env', env);
