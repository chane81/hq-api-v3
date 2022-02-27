/** 기본 DTO */
export class BaseDto {
  RESULT: boolean;
  RESULT_CODE: string;
  RESULT_MSG?: string;
}

/** paging DTO */
export class PagingDto {
  PAGE_NO: number;
  PAGE_SIZE: number;
}

/** 리스트 DTO */
export class ListDto<T = any> extends BaseDto {
  /** 총 카운트 */
  TOTAL_COUNT?: number;

  /** 리스트에서 TOTAL_COUNT 필드는 제외 */
  DATA?: Array<Omit<T, 'TOTAL_COUNT'>>;
}

/** 상세(한개 ROW) 형태 DTO */
export class DetailDto<T = any> extends BaseDto {
  DATA?: T;
}

/** Promise DetailDto 타입: 함수 리턴에서 주로 사용 */
export type TAsyncDetailDto<T> = Promise<DetailDto<T>>;

/** Promise ListDto 타입: 함수 리턴에서 주로 사용 */
export type TAsyncListDto<T> = Promise<ListDto<T>>;
