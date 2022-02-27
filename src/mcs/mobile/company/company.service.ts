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
  DBCompanyListDto,
  ReqCompanyListDto,
  ResCompanyListDto,
} from '~/dto/mobile/company/list.dto';
import {
  DBCompanyImageDto,
  ReqCompanyImageDto,
  ResCompanyImageDto,
} from '~/dto/mobile/company/image.dto';
import {
  DBCompanyIntroDto,
  ReqCompanyIntroDto,
  ResCompanyIntroDto,
} from '~/dto/mobile/company/intro.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly repo: RepoService) {}

  /** 기업 리스트 */
  async getCompanyList(reqData: ReqCompanyListDto): Promise<ResCompanyListDto> {
    let result: ResCompanyListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('CATEG_CD', reqData.CATEG_CD)
        .input('SCH_TEXT', reqData.SCH_TEXT)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCompanyListDto>('PROC_GET_M_COMPANY_LIST');

      result = getListResult<DBCompanyListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 기업 이미지 리스트 */
  async getImageList(reqData: ReqCompanyImageDto): Promise<ResCompanyImageDto> {
    let result: ResCompanyImageDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('COMPANY_ID', reqData.COMPANY_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCompanyImageDto>('PROC_GET_M_COMPANY_IMG_LIST');

      result = getListResult<DBCompanyImageDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 기업 소개 */
  async getIntro(reqData: ReqCompanyIntroDto): Promise<ResCompanyIntroDto> {
    let result: ResCompanyIntroDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('COMPANY_ID', reqData.COMPANY_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCompanyIntroDto>('PROC_GET_M_COMPANY_INTRO');

      result = getDetailResult<DBCompanyIntroDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
