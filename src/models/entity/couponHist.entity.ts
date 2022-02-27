import { BaseEntity } from '~/entity/base.entity';

/** 쿠폰 발급 내역 */
export class CouponHist extends BaseEntity {
  /** 쿠폰 HIST ID */
  COUPON_HIST_ID: number;

  /** 쿠폰 ID */
  COUPON_ID: number;

  /** 서비스 이용한 사용자 ID */
  SERVICE_USE_ID: string;

  /** 쿠폰 발급 사유 */
  REASON: string;

  /** E 쿠폰 발행을 위한 증가값(1-10) */
  INC_NO: string;

  /** 쿠폰 사용여부 Y/N */
  USE_YN: 'Y' | 'N';

  /** 삭제 여부 Y/N */
  DEL_YN: 'Y' | 'N';
}
