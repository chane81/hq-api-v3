import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { SvcModule } from './svc/svc.module';
import { CompanyModule } from './company/company.module';
import { BoardModule } from './board/board.module';
import { ReviewModule } from './review/review.module';
import { MypageModule } from './mypage/mypage.module';

@Module({
  imports: [
    AuthModule,
    MainModule,
    SvcModule,
    CompanyModule,
    BoardModule,
    ReviewModule,
    MypageModule,
  ],
})
export class MobileModule {}
