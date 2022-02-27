import { BaseEntity } from '~/entity/base.entity';

/** 서비스 */
export class Service extends BaseEntity {
  /** ID */
  SERVICE_ID: number;

  /** 기업 ID */
  COMPANY_ID: number;

  /** 서비스명 */
  NAME: string;

  /** 간단설명 */
  SHORT_DESC: string;

  /** 설명 */
  DESC: string;

  /** 카테고리 CD (GROUP_CD: A0001) */
  CATEG_CD: string;

  /** 삭제여부 Y/N */
  DEL_YN: 'Y' | 'N';
}
