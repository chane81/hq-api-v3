import { OmitType } from '@nestjs/mapped-types';
import { BaseEntity } from '~/entity/base.entity';

/** 리뷰 */
export class Review extends OmitType(BaseEntity, ['REG_ID']) {
  /** ID */
  REVIEW_ID: number;

  /** 서비스 ID */
  SERVICE_ID: number;

  /** 서비스명 */
  USER_ID: string;

  /** 간단설명 */
  USED_GRADE: string;

  /** 설명 */
  CONTENTS: string;

  /** 삭제여부 Y/N */
  DEL_YN: 'Y' | 'N';
}
