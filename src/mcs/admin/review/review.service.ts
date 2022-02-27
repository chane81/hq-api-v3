import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getDefaultResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import {
  DBReviewListDto,
  ReqReviewListDto,
  ResReviewListDto,
} from '~/dto/admin/review/list.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly repo: RepoService) {}

  /** 리뷰 리스트 */
  async getList(reqData: ReqReviewListDto): Promise<ResReviewListDto> {
    let result: ResReviewListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('PAGE_NO', reqData.PAGE_NO)
        .input('PAGE_SIZE', reqData.PAGE_SIZE)
        .input('SORT_COL', reqData.SORT_COL)
        .input('SORT', reqData.SORT)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBReviewListDto>('PROC_GET_A_REVIEW_LIST');

      result = getListResult<DBReviewListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
