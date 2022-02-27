import { Routes } from '@nestjs/core';
import { CommonModule } from '~/mcs/common/common.module';

// mobile
import { MobileModule } from '~/mcs/mobile/mobile.module';
import { AuthModule as MobileAuthModule } from '~/mcs/mobile/auth/auth.module';
import { BoardModule as MobileBoardModule } from '~/mcs/mobile/board/board.module';
import { CompanyModule as MobileCompanyModule } from '~/mcs/mobile/company/company.module';
import { MainModule as MobileMainModule } from '~/mcs/mobile/main/main.module';
import { MypageModule as MobileMypageModule } from '~/mcs/mobile/mypage/mypage.module';
import { ReviewModule as MobileReviewModule } from '~/mcs/mobile/review/review.module';
import { SvcModule as MobileSvcModule } from '~/mcs/mobile/svc/svc.module';

// admin
import { AdminModule } from '~/mcs/admin/admin.module';
import { AuthModule as AdminAuthModule } from '~/mcs/admin/auth/auth.module';
import { CompanyModule as AdminCompanyModule } from '~/mcs/admin/company/company.module';
import { SvcModule as AdminSvcModule } from '~/mcs/admin/svc/svc.module';
import { UserModule as AdminUserModule } from '~/mcs/admin/user/user.module';
import { ReviewModule as AdminReviewModule } from '~/mcs/admin/review/review.module';
import { CouponModule as AdminCouponModule } from '~/mcs/admin/coupon/coupon.module';
import { NotiModule as AdminNotiModule } from '~/mcs/admin/noti/noti.module';

const routes: Routes = [
  {
    path: 'm',
    module: MobileModule,
    children: [
      {
        path: 'auth',
        module: MobileAuthModule,
      },
      {
        path: 'board',
        module: MobileBoardModule,
      },
      {
        path: 'company',
        module: MobileCompanyModule,
      },
      {
        path: 'main',
        module: MobileMainModule,
      },
      {
        path: 'mypage',
        module: MobileMypageModule,
      },
      {
        path: 'review',
        module: MobileReviewModule,
      },
      {
        path: 'svc',
        module: MobileSvcModule,
      },
    ],
  },
  {
    path: 'adm',
    module: AdminModule,
    children: [
      {
        path: 'auth',
        module: AdminAuthModule,
      },
      {
        path: 'company',
        module: AdminCompanyModule,
      },
      {
        path: 'svc',
        module: AdminSvcModule,
      },
      {
        path: 'user',
        module: AdminUserModule,
      },
      {
        path: 'review',
        module: AdminReviewModule,
      },
      {
        path: 'coupon',
        module: AdminCouponModule,
      },
      {
        path: 'noti',
        module: AdminNotiModule,
      },
    ],
  },
  {
    path: 'c',
    module: CommonModule,
  },
];

export { routes };
