import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GUARD } from '~/constants/auth.constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [],
  providers: [
    {
      provide: GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
