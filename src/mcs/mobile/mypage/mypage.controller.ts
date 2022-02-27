import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { MypageService } from './mypage.service';
import { ListDto } from '~/dto/base.dto';
import { ReqMypageMainDto, ResMypageMainDto } from '~/dto/mobile/mypage/main.dto';
import {
  ReqMypageCouponHistDto,
  ResMypageCouponHistDto,
} from '~/dto/mobile/mypage/coupon.dto';
import {
  ReqMypageServiceListDto,
  ResMypageServiceListDto,
} from '~/dto/mobile/mypage/serviceUse.dto';
import {
  ReqMypageReviewInsertDto,
  ReqMypageReviewInsertFileDto,
  ReqMypageReviewListDto,
  ResMypageReviewInsertDto,
  ResMypageReviewListDto,
} from '~/dto/mobile/mypage/review.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  /** 리뷰 이미지 리스트 */
  @Get('getMypageMain')
  async getMypageMain(
    @Query() reqData: ReqMypageMainDto,
  ): Promise<ResMypageMainDto> {
    const result = await this.mypageService.getMypageMain(reqData);

    return result;
  }

  /** 마이페이지 쿠폰내역 */
  @Get('getMypageCouponHist')
  async getMypageCouponHist(
    @Query() reqData: ReqMypageCouponHistDto,
  ): Promise<ResMypageCouponHistDto> {
    const result = await this.mypageService.getMypageCouponHist(reqData);

    return result;
  }

  /** 마이페이지 서비스이용 내역 */
  @Get('getMypageServiceList')
  async getMypageServiceList(
    @Query() reqData: ReqMypageServiceListDto,
  ): Promise<ResMypageServiceListDto> {
    const result = await this.mypageService.getMypageServiceList(reqData);

    return result;
  }

  /** 마이페이지 리뷰 내역 */
  @Get('getMypageReviewList')
  async getMypageReviewList(
    @Query() reqData: ReqMypageReviewListDto,
  ): Promise<ResMypageReviewListDto> {
    const result = await this.mypageService.getMypageReviewList(reqData);

    return result;
  }

  /** 추천 검색어 리스트 */
  @Get('getMypageSuggestList')
  async getMypageSuggestList(): Promise<ListDto<string>> {
    const result = await this.mypageService.getMypageSuggestList();

    return result;
  }

  /** 마이페이지 리뷰 쓰기 */
  @Post('setMypageReviewInsert')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'IMG_1', maxCount: 1 },
      { name: 'IMG_2', maxCount: 1 },
      { name: 'IMG_3', maxCount: 1 },
      { name: 'IMG_4', maxCount: 1 },
      { name: 'IMG_5', maxCount: 1 },
    ]),
  )
  async setMypageReviewInsert(
    @Body() reqData: ReqMypageReviewInsertDto,
    @UploadedFiles() reqFiles: ReqMypageReviewInsertFileDto,
  ) {
    const result = await this.mypageService.setMypageReviewInsert(
      reqData,
      reqFiles,
    );

    return result;
  }
}
