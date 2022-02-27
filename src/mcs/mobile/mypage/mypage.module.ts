import { Module } from '@nestjs/common';
import { CommonService } from '~/mcs/common/common.service';
import { ReviewService } from '../review/review.service';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';

@Module({
  imports: [ReviewService, CommonService],
  controllers: [MypageController],
  providers: [MypageService, ReviewService, CommonService],
})
export class MypageModule {}
