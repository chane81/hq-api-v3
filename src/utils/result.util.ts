import { IProcedureResult, IRecordSet } from 'mssql';
import { BaseDto, DetailDto, ListDto } from '~/src/models/dto/base.dto';
import * as Sentry from '@sentry/node';
import * as _ from 'lodash';

/** DB OUTPUT 타입 */
export interface IOutput {
  [key: string]: any;
}

/**
 * default result value
 */
export const getDefaultResult: BaseDto = {
  RESULT: true,
  RESULT_CODE: '00',
  RESULT_MSG: '정상',
};

/**
 * 프로시저 수행후 output 파라메터 결과를 BaseDto object 로 변환
 * @param output 프로시저 수행 후 ouput
 * @returns BaseDto
 */
export const getBaseResult = <T>(dbResult: IProcedureResult<T>): BaseDto => {
  const { output } = dbResult;
  const result = {
    RESULT: output.RET_CODE === '00',
    RESULT_CODE: output.RET_CODE,
    RESULT_MSG: output.RET_MSG,
  };

  // db 에러시 에러 throw
  if (!result.RESULT) {
    throw result;
  }

  return result;
};

/**
 * 익셉션 발생에 대한 result object 반환
 * @param ex 익셉션 객체
 * @returns
 */
export const getErrorResult = (ex: any, requestData?: any): BaseDto => {
  console.log('[getErrorResult] dbResult', ex, requestData);

  // sentry에 에러 데이터 전송
  Sentry.captureException(ex, {
    extra: {
      op: '[db error]',
      requestData,
    },
  });

  return {
    RESULT: false,
    RESULT_CODE: ex.message ? '99' : ex.RESULT_CODE,
    RESULT_MSG: ex.message ?? ex.RESULT_MSG,
  };
};

/**
 * 상세 result
 * @param dbResult db 결과
 */
export const getDetailResult = <T>(
  dbResult: IProcedureResult<T>,
): DetailDto<T> => {
  const { recordset } = dbResult;
  let result: DetailDto<T> = getDefaultResult;
  const isDataEmpty = !recordset || recordset.length === 0;

  result = {
    ...getBaseResult(dbResult),
    DATA: isDataEmpty ? null : recordset[0],
  };

  return result;
};

/**
 * 리스트 result
 * @param dbResult db 결과
 */
export const getListResult = <T extends { TOTAL_COUNT: number }>(
  dbResult: IProcedureResult<T>,
): ListDto<T> => {
  const { recordset } = dbResult;
  let result: ListDto<T> = getDefaultResult;
  const isDataEmpty = !recordset || recordset.length === 0;

  // 필드중 TOTAL_COUNT 필드는 제외
  const getData = (data: IRecordSet<T>) =>
    data.map((val) => _.omit(val, 'TOTAL_COUNT'));

  result = {
    ...getBaseResult(dbResult),
    TOTAL_COUNT: isDataEmpty ? 0 : recordset?.[0].TOTAL_COUNT,
    DATA: isDataEmpty ? null : getData(recordset),
  };

  return result;
};

/**
 * 리스트 데이터중 특정 필드만 가져오게 함
 * @param data 리스트형태 데이터
 * @param arrayColName 데이터중 가져올 필드값 ex) ['GROUP_ID', 'NAME]
 */
export const getPickFieldResult = <T extends Record<string, unknown>>(
  data: T[],
  arrayColName: Array<keyof T>,
): T[] => {
  let rtnVal: any = {};

  rtnVal = _.map(data, (row) => {
    const pick = _.pick(row, arrayColName);
    return pick;
  });

  return rtnVal;
};
