import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { ReviewService } from './review.service';
import { ReqReviewListDto, ResReviewListDto } from '~/dto/admin/review/list.dto';
import { AuthGuard } from '~/mcs/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
@UseFilters(new AllExceptionsFilter())
export class ReviewController {
  constructor(private readonly svcService: ReviewService) {}

  /** 리뷰 리스트 */
  @Get('getList')
  async getList(@Query() reqData: ReqReviewListDto): Promise<ResReviewListDto> {
    const result = await this.svcService.getList(reqData);

    return result;
  }
}
