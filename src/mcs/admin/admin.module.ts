import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { SvcModule } from './svc/svc.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { CouponModule } from './coupon/coupon.module';
import { NotiModule } from './noti/noti.module';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    SvcModule,
    UserModule,
    ReviewModule,
    CouponModule,
    NotiModule,
  ],
})
export class AdminModule {}
