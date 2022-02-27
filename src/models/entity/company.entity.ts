import { BaseEntity } from '~/entity/base.entity';

/** 기업 */
export class Company extends BaseEntity {
  /** ID */
  COMPANY_ID: number;

  /** 기업명 */
  NAME: string;

  /** 기업 간단 설명 */
  SHORT_DESC: string;

  /** 기업 설명 */
  DESC: string;

  /** 우편번호 */
  ZIP_CODE: string;

  /** 주소 */
  ADDR: string;

  /** 대표자명 */
  OWNER: string;

  /** 사업자 등록번호 */
  BUSINESS_NO: string;

  /** 주소 */
  TEL_NO: string;

  /** 해시 태그 */
  HASH_TAG: string;

  /** 위도 */
  LAT: number;

  /** 경도 */
  LON: number;
}
