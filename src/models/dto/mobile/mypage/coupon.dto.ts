import { PickType } from '@nestjs/mapped-types';
import { ListDto } from '~/dto/base.dto';
import { User } from '~/entity/user.entity';

/** req 마이페이지 쿠폰 내역 */
export class ReqMypageCouponHistDto extends PickType(User, ['USER_ID' as const]) {}

/** res 마이페이지 쿠폰 내역 */
export class ResMypageCouponHistDto extends ListDto<DBMypageCouponHistDto> {
  /** 쿠폰 카운트 */
  COUPON_COUNT?: number;
}

/** db 마이페이지 쿠폰 내역 */
export class DBMypageCouponHistDto {
  /** 총 카운트 */
  TOTAL_COUNT: number;
  /** T: 일반쿠폰, E: E쿠폰, X: 쿠폰 없음(리뷰작성 안했음) */
  GUBUN_CD: string;
  /** 서비스명 */
  NAME: number;
  /** 확정 일자 */
  CONFIRM_DT: string;
}
