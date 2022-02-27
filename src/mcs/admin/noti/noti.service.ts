import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getBaseResult,
  getDefaultResult,
  getDetailResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import {
  DBNotiListDto,
  ReqNotiListDto,
  ResNotiListDto,
} from '~/dto/admin/noti/list.dto';
import {
  DBNotiDetailDto,
  ReqNotiDetailDto,
  ResNotiDetailDto,
} from '~/dto/admin/noti/detail.dto';
import { ReqNotiModifyDto, ResNotiModifyDto } from '~/dto/admin/noti/modify.dto';
import { BaseDto } from '~/dto/base.dto';
import { ReqNotiInsertDto, ResNotiInsertDto } from '~/dto/admin/noti/insert.dto';

@Injectable()
export class NotiService {
  constructor(private readonly repo: RepoService) {}

  /** 공지 리스트 */
  async getList(reqData: ReqNotiListDto): Promise<ResNotiListDto> {
    let result: ResNotiListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('PAGE_NO', reqData.PAGE_NO)
        .input('PAGE_SIZE', reqData.PAGE_SIZE)
        .input('SORT_COL', reqData.SORT_COL)
        .input('SORT', reqData.SORT)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBNotiListDto>('PROC_GET_A_NOTI_LIST');

      result = getListResult<DBNotiListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 공지 상세 */
  async getDetail(reqData: ReqNotiDetailDto): Promise<ResNotiDetailDto> {
    let result: ResNotiDetailDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('BOARD_ID', reqData.BOARD_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBNotiDetailDto>('PROC_GET_A_NOTI_DETAIL');

      result = getDetailResult<DBNotiDetailDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 공지 등록 */
  async setInsert(
    reqData: ReqNotiInsertDto,
    userId: number,
  ): Promise<ResNotiInsertDto> {
    let result: ResNotiInsertDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('USER_ID', userId)
        .input('TITLE', reqData.TITLE)
        .input('SHORT_DESC', reqData.SHORT_DESC)
        .input('CONTENTS', reqData.CONTENTS)
        .input('URL_1', reqData.URL_1)
        .input('URL_2', reqData.URL_2)
        .input('URL_3', reqData.URL_3)
        .input('USE_YN', reqData.USE_YN)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<BaseDto>('PROC_SET_A_NOTI_INSERT');

      result = getBaseResult(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 공지 수정 */
  async setModify(
    reqData: ReqNotiModifyDto,
    userId: number,
  ): Promise<ResNotiModifyDto> {
    let result: ResNotiModifyDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('BOARD_ID', reqData.BOARD_ID)
        .input('USER_ID', userId)
        .input('TITLE', reqData.TITLE)
        .input('SHORT_DESC', reqData.SHORT_DESC)
        .input('CONTENTS', reqData.CONTENTS)
        .input('URL_1', reqData.URL_1)
        .input('URL_2', reqData.URL_2)
        .input('URL_3', reqData.URL_3)
        .input('USE_YN', reqData.USE_YN)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<BaseDto>('PROC_SET_A_NOTI_MODIFY');

      result = getBaseResult(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
