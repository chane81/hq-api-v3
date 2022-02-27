import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getDefaultResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import { ListDto, TAsyncListDto } from '~/dto/base.dto';
import {
  DBCodeListDto,
  ReqCodeListDto,
  ResCodeListDto,
} from '~/dto/common/codeList.dto';

@Injectable()
export class CommonService {
  constructor(private readonly repo: RepoService) {}

  /** 코드리스트 */
  async getCodeList(reqData: ReqCodeListDto): Promise<ResCodeListDto> {
    let result: ResCodeListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('GROUP_ID', reqData.GROUP_ID)
        .input('CD', reqData.CD)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCodeListDto>('PROC_GET_CODE_LIST');

      result = getListResult<DBCodeListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
