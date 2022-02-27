import { OmitType } from '@nestjs/mapped-types';
import { BaseEntity } from '~/entity/base.entity';

/** 서비스 이용 내역 */
export class ServiceUse extends OmitType(BaseEntity, ['MOD_ID', 'REG_ID']) {
  /** ID */
  SERVICE_USE_ID: number;

  /** 서비스 ID */
  SERVICE_ID: number;

  /** 서비스명 */
  USER_ID: number;

  /** 서비스 이용 상태(A0004) */
  STATUS_CD: string;

  /** 서비스 확정 일시 */
  CONFIRM_DT: Date;

  /** 서비스 취소 일시 */
  CANCEL_DT: Date;
}
