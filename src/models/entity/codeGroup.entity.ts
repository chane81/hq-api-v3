import { BaseEntity } from '~/entity/base.entity';

/** 그룹 코드 */
export class CodeGroup extends BaseEntity {
  /** 그룹 코드 */
  GROUP_ID: string;

  /** 그룹명 */
  NAME: string;

  /** 그룹 소트 */
  SORT: number;

  /** 비고 */
  ETC: string;

  /** 삭제여부 Y/N */
  DEL_YN: 'Y' | 'N';
}
