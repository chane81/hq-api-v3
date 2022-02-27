import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getDefaultResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import {
  DBCouponListDto,
  ReqCouponListDto,
  ResCouponListDto,
} from '~/dto/admin/coupon/list.dto';

@Injectable()
export class CouponService {
  constructor(private readonly repo: RepoService) {}

  /** 쿠폰 리스트 */
  async getList(reqData: ReqCouponListDto): Promise<ResCouponListDto> {
    let result: ResCouponListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('PAGE_NO', reqData.PAGE_NO)
        .input('PAGE_SIZE', reqData.PAGE_SIZE)
        .input('SORT_COL', reqData.SORT_COL)
        .input('SORT', reqData.SORT)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCouponListDto>('PROC_GET_A_COUPON_LIST');

      result = getListResult<DBCouponListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
