import { BaseEntity } from '~/entity/base.entity';

/** 그룹 코드 */
export class Code extends BaseEntity {
  /** 그룹 코드 */
  GROUP_ID: string;

  /** 코드 */
  CD: string;

  /** 코드명 */
  NAME: string;

  /** 소트 */
  SORT: number;

  /** 비고 1 */
  ETC_1: string;

  /** 비고 2 */
  ETC_2: string;

  /** 비고 3 */
  ETC_3: string;

  /** 비고 4 */
  ETC_4: string;

  /** 삭제여부 Y/N */
  DEL_YN: 'Y' | 'N';
}
