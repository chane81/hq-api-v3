import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { ReviewService } from './review.service';
import { ReqReviewListDto, ResReviewListDto } from '~/dto/mobile/review/list.dto';
import {
  ReqReviewImageDto,
  ResReviewImageDto,
} from '~/dto/mobile/review/image.dto';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /** 리뷰 이미지 리스트 */
  @Get('getImageList')
  async getImageList(
    @Query() reqData: ReqReviewImageDto,
  ): Promise<ResReviewImageDto> {
    const result = await this.reviewService.getImageList(reqData);

    return result;
  }

  /** 리뷰 리스트 */
  @Get('getReviewList')
  async getReviewList(
    @Query() reqData: ReqReviewListDto,
  ): Promise<ResReviewListDto> {
    const result = await this.reviewService.getReviewList(reqData);
    const rtnImg = (imgNum: number, imgUrls?: string[]) =>
      imgUrls && imgUrls.length > imgNum ? imgUrls[imgNum] : null;

    // 리뷰 이미지들 result 변수에 바인딩
    if (result.DATA) {
      await Promise.all(
        result.DATA.map(async (row) => {
          const imgList = await this.reviewService.getImageList({
            REVIEW_ID: row.REVIEW_ID,
          });

          row.REVIEW_IMG_COUNT = imgList.TOTAL_COUNT;
          const imgUrls = imgList.DATA?.map((img) => img.IMG_URL);

          // image 1~5 까지 insert
          [...Array(5).keys()].forEach((idx) => {
            row[`REVIEW_IMG_URL_${idx + 1}`] = rtnImg(idx, imgUrls);
          });
        }),
      );
    }

    return result;
  }
}
