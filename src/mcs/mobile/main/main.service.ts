import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getDefaultResult,
  getErrorResult,
  getListResult,
  getPickFieldResult,
} from '~/utils/result.util';
import { DBMainImageDto, ResMainImageDto } from '~/dto/mobile/main/image.dto';
import { DBMainCategDto, ResMainCategDto } from '~/dto/mobile/main/categ.dto';

@Injectable()
export class MainService {
  constructor(private readonly repo: RepoService) {}

  /** 메인 이미지 */
  async getImageList(): Promise<ResMainImageDto> {
    let result: ResMainImageDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBMainImageDto>('PROC_GET_M_MAIN_IMG_LIST');

      result = getListResult<DBMainImageDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex);
    }

    return result;
  }

  /** 메인 카테고리 */
  async getCategList(): Promise<ResMainCategDto> {
    let result: ResMainCategDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('GROUP_ID', 'A0001')
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBMainCategDto>('PROC_GET_CODE_LIST');

      result = getListResult<DBMainCategDto>(dbResult);

      // ETC_1, ETC_2, ETC_3, ETC_4 는 제외
      result.DATA = getPickFieldResult(result.DATA, ['CD', 'NAME']);
    } catch (ex) {
      result = getErrorResult(ex);
    }

    return result;
  }
}
