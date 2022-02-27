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
  DBUserListDto,
  ReqUserListDto,
  ResUserListDto,
} from '~/dto/admin/user/list.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: RepoService) {}

  /** 유저 리스트 */
  async getUserList(reqData: ReqUserListDto): Promise<ResUserListDto> {
    let result: ResUserListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('PAGE_NO', reqData.PAGE_NO)
        .input('PAGE_SIZE', reqData.PAGE_SIZE)
        .input('GUBUN_CD', reqData.GUBUN_CD)
        .input('EMAIL', reqData.EMAIL)
        .input('PHONE_NO', reqData.PHONE_NO)
        .input('SORT_COL', reqData.SORT_COL)
        .input('SORT', reqData.SORT)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBUserListDto>('PROC_GET_A_USER_LIST');

      result = getListResult<DBUserListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
