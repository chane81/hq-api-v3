import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import { DBLoginDto, ReqLoginDto, ResLoginDto } from '~/dto/admin/auth/login.dbo';
import {
  getDefaultResult,
  getDetailResult,
  getErrorResult,
} from '~/utils/result.util';

@Injectable()
export class AuthService {
  constructor(private readonly repo: RepoService) {}

  /** 로그인 */
  async setLogin(reqData: ReqLoginDto): Promise<ResLoginDto> {
    let result: ResLoginDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('GUBUN', 'A')
        .input('EMAIL', reqData.EMAIL)
        .input('PWD', reqData.PWD)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBLoginDto>('PROC_GET_LOGIN_CHECK');

      result = getDetailResult<DBLoginDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
