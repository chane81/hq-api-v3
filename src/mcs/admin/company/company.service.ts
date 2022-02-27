import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import {
  getBaseResult,
  getDefaultResult,
  getDetailResult,
  getErrorResult,
  getListResult,
} from '~/utils/result.util';
import {
  DBCompanyListDto,
  ReqCompanyListDto,
  ResCompanyListDto,
} from '~/dto/admin/company/list.dto';
import {
  CompanyImgInsertDto,
  ReqCompanyInsertDto,
  ReqCompanyInsertFileDto,
  ResCompanyInsertDto,
} from '~/dto/admin/company/insert.dto';
import { UploadService } from '~/mcs/upload/upload.service';
import { range } from 'lodash';
import { BaseDto } from '~/dto/base.dto';
import {
  DBCompanyDetailDto,
  ReqCompanyDetailDto,
  ResCompanyDetailDto,
} from '~/dto/admin/company/detail.dto';
import {
  DBCompanyImageDto,
  ReqCompanyImageDto,
  ResCompanyImageDto,
} from '~/dto/admin/company/image.dto';
import {
  CompanyImgDelDto,
  CompanyImgModifyDto,
  ReqCompanyModifyDto,
  ReqCompanyModifyFileDto,
  ResCompanyModifyDto,
} from '~/dto/admin/company/modify.dto';
import {
  DBCompanySimpleListDto,
  ResCompanySimpleListDto,
} from '~/dto/admin/company/simpleList.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly repo: RepoService,
    private readonly uploadService: UploadService,
  ) {}

  /** 기업 리스트 */
  async getList(reqData: ReqCompanyListDto): Promise<ResCompanyListDto> {
    let result: ResCompanyListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('PAGE_NO', reqData.PAGE_NO)
        .input('PAGE_SIZE', reqData.PAGE_SIZE)
        .input('CATEG_CD', reqData.CATEG_CD)
        .input('SCH_TEXT', reqData.SCH_TEXT)
        .input('SORT_COL', reqData.SORT_COL)
        .input('SORT', reqData.SORT)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCompanyListDto>('PROC_GET_A_COMPANY_LIST');

      result = getListResult<DBCompanyListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 기업 간단 리스트 */
  async getSimpleList(): Promise<ResCompanySimpleListDto> {
    let result: ResCompanySimpleListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCompanySimpleListDto>('PROC_GET_A_COMPANY_SIMPLE_LIST');

      result = getListResult<DBCompanySimpleListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex);
    }

    return result;
  }

  /** 기업정보 등록 */
  async setInsert(
    reqData: ReqCompanyInsertDto,
    reqFiles: ReqCompanyInsertFileDto,
    userId: number,
  ): Promise<ResCompanyInsertDto> {
    let result: ResCompanyInsertDto = getDefaultResult;

    try {
      const imgInfos: CompanyImgInsertDto[] = [];
      const reqImgInfos: CompanyImgInsertDto[] = JSON.parse(reqData.IMG_INFOS);

      await Promise.all(
        reqFiles.IMGS.map(async (img, idx) => {
          if (img) {
            // s3 에 file upload 실행
            const uploadResult = await this.uploadService.upload(
              [img],
              'images/기업',
            );

            // 만약 정상 업로드 되었다면
            if (uploadResult.RESULT) {
              const reqInfo = reqImgInfos.find(
                (val) => val.FILE_NAME === img.originalname,
              );
              const MAIN_YN = reqInfo.MAIN_YN;
              const SORT = reqInfo.SORT;
              const IMG_URL = uploadResult.DATA?.[0];

              imgInfos.push({
                IMG_URL,
                MAIN_YN,
                SORT,
                UPLOAD_SUCCESS_YN: 'Y',
              });
            } else {
              imgInfos.push({
                UPLOAD_SUCCESS_YN: 'N',
              });
            }
          }
        }),
      );

      // 1. 만약 업로드해야할 이미지들이 있고 업로드가 모두 성공이면 db exec
      // 2. 업로드할 이미지 개수가 0개이면 db exec
      if (
        (imgInfos.length > 0 &&
          !imgInfos.some((val) => val.UPLOAD_SUCCESS_YN === 'N')) ||
        imgInfos.length === 0
      ) {
        const dbResult = await this.repo
          .getReq()
          .input('USER_ID', userId)
          .input('NAME', reqData.NAME)
          .input('SHOT_DESC', reqData.SHORT_DESC)
          .input('DESC', reqData.DESC)
          .input('TEL_NO', reqData.TEL_NO)
          .input('ADDR', reqData.ADDR)
          .input('ZIP_CODE', reqData.ZIP_CODE)
          .input('OWNER', reqData.OWNER)
          .input('BUSINESS_NO', reqData.BUSINESS_NO)
          .input('HASH_TAG', reqData.HASH_TAG)
          .input('LAT', reqData.LAT)
          .input('LON', reqData.LON)
          .input('IMG_INFOS_JSON', JSON.stringify(imgInfos))
          .output('RET_CODE', VarChar(10))
          .output('RET_MSG', VarChar(500))
          .execute<BaseDto>('PROC_SET_A_COMPANY_INSERT');

        result = getBaseResult(dbResult);
      }
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 기업정보 수정 */
  async setModify(
    reqData: ReqCompanyModifyDto,
    reqFiles: ReqCompanyModifyFileDto,
    userId: number,
  ): Promise<ResCompanyModifyDto> {
    let result: ResCompanyModifyDto = getDefaultResult;

    try {
      const imgInfos: CompanyImgModifyDto[] = [];
      const reqImgInfos: CompanyImgModifyDto[] = JSON.parse(reqData.IMG_INFOS);
      const reqDelImgs: CompanyImgDelDto[] = JSON.parse(reqData.DEL_IMGS);

      // 삭제할 파일이 있으면 삭제 처리
      if (reqDelImgs && reqDelImgs.length > 0) {
        const res = await this.uploadService.delete(
          reqDelImgs.map((v) => v.IMG_URL),
        );

        if (!res.RESULT) {
          throw Error(res.RESULT_MSG);
        }
      }

      // 업로드할 파일 있으면 업로드 처리
      if (reqFiles.IMGS) {
        await Promise.all(
          reqFiles.IMGS?.map(async (img, idx) => {
            if (img) {
              // s3 에 file upload 실행
              const uploadResult = await this.uploadService.upload(
                [img],
                'images/기업',
              );

              // 만약 정상 업로드 되었다면
              if (uploadResult.RESULT) {
                const reqInfo = reqImgInfos.find(
                  (val) => val.FILE_NAME === img.originalname,
                );
                const IMAGE_ID = reqInfo.IMAGE_ID;
                const MAIN_YN = reqInfo.MAIN_YN;
                const SORT = reqInfo.SORT;
                const FILE_NAME = reqInfo.FILE_NAME;
                const IMG_URL = uploadResult.DATA?.[0];

                imgInfos.push({
                  FILE_NAME,
                  IMG_URL,
                  MAIN_YN,
                  SORT,
                  UPLOAD_SUCCESS_YN: 'Y',
                });
              } else {
                imgInfos.push({
                  UPLOAD_SUCCESS_YN: 'N',
                });
              }
            }
          }),
        );
      }

      // 만약 기존 이미지 데이터중 수정할게 있다면
      const updateImgs = reqImgInfos.filter((v) => v.IMAGE_ID);
      if (updateImgs && updateImgs.length > 0) {
        updateImgs.map((v) => imgInfos.push(v));
      }

      const dbResult = await this.repo
        .getReq()
        .input('COMPANY_ID', reqData.COMPANY_ID)
        .input('USER_ID', userId)
        .input('NAME', reqData.NAME)
        .input('SHOT_DESC', reqData.SHORT_DESC)
        .input('DESC', reqData.DESC)
        .input('TEL_NO', reqData.TEL_NO)
        .input('ADDR', reqData.ADDR)
        .input('ZIP_CODE', reqData.ZIP_CODE)
        .input('OWNER', reqData.OWNER)
        .input('BUSINESS_NO', reqData.BUSINESS_NO)
        .input('HASH_TAG', reqData.HASH_TAG)
        .input('LAT', reqData.LAT)
        .input('LON', reqData.LON)
        .input('DEL_IMGS', reqDelImgs.map((v) => v.IMAGE_ID).join(','))
        .input('IMG_INFOS_JSON', JSON.stringify(imgInfos))
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<BaseDto>('PROC_SET_A_COMPANY_MODIFY');

      result = getBaseResult(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 기업 상세 */
  async getDetail(reqData: ReqCompanyDetailDto): Promise<ResCompanyDetailDto> {
    let result: ResCompanyDetailDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('COMPANY_ID', reqData.COMPANY_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBCompanyDetailDto>('PROC_GET_A_COMPANY_DETAIL');

      result = getDetailResult<DBCompanyDetailDto>(dbResult);

      const dbImageListResult = await this.getImageList(reqData);

      if (result.DATA) {
        result.DATA.IMG_INFOS = [];

        dbImageListResult.DATA?.forEach((val) =>
          result.DATA.IMG_INFOS.push({
            IMAGE_ID: val.IMAGE_ID,
            IMG_URL: val.IMG_URL,
            MAIN_YN: val.MAIN_YN,
          }),
        );
      }
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
        .execute<DBCompanyImageDto>('PROC_GET_A_COMPANY_IMG_LIST');

      result = getListResult<DBCompanyImageDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
