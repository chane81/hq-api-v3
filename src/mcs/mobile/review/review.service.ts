import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { Int, VarChar } from 'mssql';
import {
  getDefaultResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import {
  DBReviewListDto,
  ReqReviewListDto,
  ResReviewListDto,
} from '~/dto/mobile/review/list.dto';
import {
  DBReviewImageDto,
  ReqReviewImageDto,
  ResReviewImageDto,
} from '~/dto/mobile/review/image.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly repo: RepoService) {}

  /** 리뷰 이미지 리스트 */
  async getImageList(reqData: ReqReviewImageDto): Promise<ResReviewImageDto> {
    let result: ResReviewImageDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('REVIEW_ID', reqData.REVIEW_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBReviewImageDto>('PROC_GET_M_REVIEW_IMG_LIST');

      result = getListResult<DBReviewImageDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 리뷰 리스트 */
  async getReviewList(reqData: ReqReviewListDto): Promise<ResReviewListDto> {
    let result: ResReviewListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('COMPANY_ID', reqData.COMPANY_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .output('RET_AVERAGE_USED_GRADE', Int)
        .execute<DBReviewListDto>('PROC_GET_M_REVIEW_LIST');

      // 평균 별점
      const averageUsedGrade = dbResult?.output?.RET_AVERAGE_USED_GRADE || 0;

      result = {
        AVERAGE_USED_GRADE: averageUsedGrade,
        ...getListResult<DBReviewListDto>(dbResult),
      };
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
