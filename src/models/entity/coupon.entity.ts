import { BaseEntity } from '~/entity/base.entity';

/** 쿠폰 */
export class Coupon extends BaseEntity {
  /** ID */
  COUPON_ID: number;

  /** 쿠폰 설명 */
  DESC: number;

  /** 쿠폰 구분 CD - T: 나무, E: E 쿠폰 */
  GUBUN_CD: string;
}
