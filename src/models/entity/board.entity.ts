import { BaseEntity } from '~/entity/base.entity';

/** 게시판 */
export class Board extends BaseEntity {
  /** ID */
  BOARD_ID: number;

  /** 제목 */
  TITLE: string;

  /** 간단 설명 */
  SHORT_DESC: string;

  /** 내용 */
  CONTENTS: string;

  /** 게시판 구분 CD (GROUP_CD: A0002)
   * N: 공지
   * R: 리뷰
   */
  GUBUN_CD: string;

  /** URL 1 */
  URL_1: string;

  /** URL 2 */
  URL_2: string;

  /** URL 3 */
  URL_3: string;

  /** 사용 여부 Y/N */
  USE_YN: 'Y' | 'N';

  /** 삭제 여부 Y/N */
  DEL_YN: 'Y' | 'N';
}
