/** 사용자 */
export class BaseEntity {
  /** 등록자 ID */
  REG_ID: number;

  /** 등록일시 */
  REG_DT: Date | 'string';

  /** 수정자 ID */
  MOD_ID: number;

  /** 수정일시 */
  MOD_DT: Date | 'string';
}
