import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getDefaultResult,
  getDetailResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import {
  DBNotiDetailDto,
  DBNotiListDto,
  ReqNotiDetailDto,
  ResNotiDetailDto,
  ResNotiListDto,
} from '~/dto/mobile/board/noti.dto';

@Injectable()
export class BoardService {
  constructor(private readonly repo: RepoService) {}

  /** 공지 리스트 */
  async getNotiList(): Promise<ResNotiListDto> {
    let result: ResNotiListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBNotiListDto>('PROC_GET_M_NOTI_LIST');

      result = getListResult<DBNotiListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex);
    }

    return result;
  }

  /** 공지 상세 */
  async getNotiDetail(reqData: ReqNotiDetailDto): Promise<ResNotiDetailDto> {
    let result: ResNotiDetailDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .input('BOARD_ID', reqData.BOARD_ID)
        .execute<DBNotiDetailDto>('PROC_GET_M_NOTI_DETAIL');

      result = getDetailResult<DBNotiDetailDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
