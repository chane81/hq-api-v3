import { BaseEntity } from '~/entity/base.entity';

/** 이미지 */
export class Image extends BaseEntity {
  /** ID */
  IMAGE_ID: number;

  /** 이미지 구분 CD (GROUP_CD: A0007)
   * C: 기업 이미지
   * S: 서비스 이미지
   * R: 리뷰 이미지
   */
  GUBUN_CD: string;

  /** 이미지 URL */
  IMG_URL: string;

  /** ID형태 연결 키 값 */
  REF_ID: number;

  /** 코드 형태 연결 키값 */
  REF_CODE: string;

  /** 정렬 */
  SORT: number;

  /** 대표이미지 여부 Y/N */
  MAIN_YN: 'Y' | 'N';

  /** 메인 상단 이미지 여부 Y/N */
  MAIN_EVENT_YN: 'Y' | 'N';
}
