import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { CouponService } from './coupon.service';
import { AuthGuard } from '~/mcs/auth/auth.guard';
import { ReqCouponListDto, ResCouponListDto } from '~/dto/admin/coupon/list.dto';

@UseGuards(AuthGuard)
@Controller()
@UseFilters(new AllExceptionsFilter())
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  /** 쿠폰 리스트 */
  @Get('getList')
  async getList(@Query() reqData: ReqCouponListDto): Promise<ResCouponListDto> {
    const result = await this.couponService.getList(reqData);

    return result;
  }
}
