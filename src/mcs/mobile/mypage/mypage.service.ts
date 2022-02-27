import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { Int, VarChar } from 'mssql';
import {
  getBaseResult,
  getDefaultResult,
  getDetailResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import { BaseDto, ListDto } from '~/dto/base.dto';
import {
  DBMypageMainDto,
  ReqMypageMainDto,
  ResMypageMainDto,
} from '~/dto/mobile/mypage/main.dto';
import {
  DBMypageCouponHistDto,
  ReqMypageCouponHistDto,
  ResMypageCouponHistDto,
} from '~/dto/mobile/mypage/coupon.dto';
import {
  DBMypageServiceListDto,
  ReqMypageServiceListDto,
  ResMypageServiceListDto,
} from '~/dto/mobile/mypage/serviceUse.dto';
import {
  DBMypageReviewListDto,
  ReqMypageReviewInsertDto,
  ReqMypageReviewInsertFileDto,
  ReqMypageReviewListDto,
  ResMypageReviewInsertDto,
  ResMypageReviewListDto,
} from '~/dto/mobile/mypage/review.dto';
import { CommonService } from '~/mcs/common/common.service';
import { ReviewService } from '~/mcs/mobile/review/review.service';
import { UploadService } from '~/mcs/upload/upload.service';

@Injectable()
export class MypageService {
  constructor(
    private readonly repo: RepoService,
    private readonly reviewService: ReviewService,
    private readonly commonService: CommonService,
    private readonly uploadService: UploadService,
  ) {}

  /** 마이 페이지 메인 */
  async getMypageMain(reqData: ReqMypageMainDto): Promise<ResMypageMainDto> {
    let result: ResMypageMainDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('USER_ID', reqData.USER_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBMypageMainDto>('PROC_GET_M_MYPAGE_MAIN');

      result = getDetailResult<DBMypageMainDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 마이페이지 쿠폰내역 */
  async getMypageCouponHist(
    reqData: ReqMypageCouponHistDto,
  ): Promise<ResMypageCouponHistDto> {
    let result: ResMypageCouponHistDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('USER_ID', reqData.USER_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .output('RET_COUPON_COUNT', Int)
        .execute<DBMypageCouponHistDto>('PROC_GET_M_MYPAGE_COUPON_HIST');

      // 일반쿠폰 개수(e-쿠폰 아님)
      const couponCount = dbResult?.output?.RET_COUPON_COUNT || 0;

      result = {
        COUPON_COUNT: couponCount,
        ...getListResult<DBMypageCouponHistDto>(dbResult),
      };
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 마이페이지 서비스이용 내역 */
  async getMypageServiceList(
    reqData: ReqMypageServiceListDto,
  ): Promise<ResMypageServiceListDto> {
    let result: ResMypageServiceListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('USER_ID', reqData.USER_ID)
        .input('SERVICE_ID', reqData.SERVICE_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBMypageServiceListDto>('PROC_GET_M_MYPAGE_SERVICE_LIST');

      result = getListResult<DBMypageServiceListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 마이페이지 리뷰 내역 */
  async getMypageReviewList(
    reqData: ReqMypageReviewListDto,
  ): Promise<ResMypageReviewListDto> {
    let result: ResMypageReviewListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('USER_ID', reqData.USER_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBMypageReviewListDto>('PROC_GET_M_MYPAGE_REVIEW_LIST');

      result = getListResult<DBMypageReviewListDto>(dbResult);
      const rtnImg = (imgNum: number, imgUrls?: string[]) =>
        imgUrls && imgUrls.length > imgNum ? imgUrls[imgNum] : null;

      // 리뷰 이미지들 result 변수에 바인딩
      if (result.DATA) {
        await Promise.all(
          result.DATA.map(async (row) => {
            const imgList = await this.reviewService.getImageList({
              REVIEW_ID: row.REVIEW_ID,
            });

            const imgUrls = imgList.DATA?.map((img) => img.IMG_URL);

            // image 1~5 까지 insert
            [...Array(5).keys()].forEach((idx) => {
              row[`REVIEW_IMG_URL_${idx + 1}`] = rtnImg(idx, imgUrls);
            });
          }),
        );
      }
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 추천 검색어 리스트 */
  async getMypageSuggestList(): Promise<ListDto<string>> {
    let result: ListDto<string> = getDefaultResult;

    try {
      const codeList = await this.commonService.getCodeList({
        GROUP_ID: 'A0003',
      });

      result.TOTAL_COUNT = codeList.TOTAL_COUNT;
      result.DATA = codeList.DATA.map((val) => val.NAME);
    } catch (ex) {
      result = getErrorResult(ex);
    }

    return result;
  }

  /** 마이페이지 리뷰 쓰기 */
  async setMypageReviewInsert(
    reqData: ReqMypageReviewInsertDto,
    reqFiles: ReqMypageReviewInsertFileDto,
  ): Promise<ResMypageReviewInsertDto> {
    let result: ResMypageReviewInsertDto = getDefaultResult;

    try {
      // aws 파일 업로드
      const files = [
        reqFiles.IMG_1?.[0],
        reqFiles.IMG_2?.[0],
        reqFiles.IMG_3?.[0],
        reqFiles.IMG_4?.[0],
        reqFiles.IMG_5?.[0],
      ];
      const uploadResult = await this.uploadService.upload(files, 'images/리뷰');

      // 정상 업로드시 리뷰 데이터 저장
      if (uploadResult.RESULT) {
        const dbResult = await this.repo
          .getReq()
          .input('USER_ID', reqData.USER_ID)
          .input('SERVICE_USE_ID', reqData.SERVICE_USE_ID)
          .input('USED_GRADE', reqData.USED_GRADE)
          .input('CONTENTS', reqData.CONTENTS)
          .input('IMG_URLS', uploadResult.DATA.join('^'))
          .output('RET_CODE', VarChar(10))
          .output('RET_MSG', VarChar(500))
          .output('RET_ECOUPON_YN', VarChar(1))
          .execute<BaseDto>('PROC_SET_M_REVIEW_INSERT');

        result = getBaseResult(dbResult);

        if (result.RESULT) {
          result.ECOUPON_YN = dbResult.output['RET_ECOUPON_YN'];
        } else {
          // db 저장 실패이면 파일 삭제
          this.uploadService.delete(uploadResult.DATA);
        }
      } else {
        result = uploadResult;
      }
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
