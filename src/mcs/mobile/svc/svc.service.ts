import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getDefaultResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import {
  DBSvcImageDto,
  ReqSvcImageDto,
  ResSvcImageDto,
} from '~/dto/mobile/svc/image.dto';
import {
  DBSvcListDto,
  ReqSvcListDto,
  ResSvcListDto,
} from '~/dto/mobile/svc/list.dto';

@Injectable()
export class SvcService {
  constructor(private readonly repo: RepoService) {}

  /** 서비스에 해당하는 이미지 리스트 */
  async getImageList(reqData: ReqSvcImageDto): Promise<ResSvcImageDto> {
    let result: ResSvcImageDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('SERVICE_ID', reqData.SERVICE_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBSvcImageDto>('PROC_GET_M_SERVICE_IMG_LIST');

      result = getListResult<DBSvcImageDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 기업에 해당하는 서비스 리스트 */
  async getSvcList(reqData: ReqSvcListDto): Promise<ResSvcListDto> {
    let result: ResSvcListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('COMPANY_ID', reqData.COMPANY_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBSvcListDto>('PROC_GET_M_SERVICE_LIST');

      result = getListResult<DBSvcListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
