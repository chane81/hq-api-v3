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
  ReqSvcListDto,
  DBSvcListDto,
  ResSvcListDto,
} from '~/dto/admin/svc/list.dto';
import {
  ReqServiceInsertDto,
  ReqServiceInsertFileDto,
  ResServiceInsertDto,
  ServiceImgInsertDto,
} from '~/dto/admin/svc/insert.dto';
import { UploadService } from '~/mcs/upload/upload.service';
import { BaseDto } from '~/dto/base.dto';
import {
  DBServiceDetailDto,
  ReqServiceDetailDto,
  ResServiceDetailDto,
} from '~/dto/admin/svc/detail.dto';
import {
  DBServiceImageDto,
  ReqServiceImageDto,
  ResServiceImageDto,
} from '~/dto/admin/svc/image.dto';
import {
  ReqServiceModifyDto,
  ReqServiceModifyFileDto,
  ResServiceModifyDto,
  ServiceImgDelDto,
  ServiceImgModifyDto,
} from '~/dto/admin/svc/modify.dto';

@Injectable()
export class SvcService {
  constructor(
    private readonly repo: RepoService,
    private readonly uploadService: UploadService,
  ) {}

  /** 서비스 리스트 */
  async getList(reqData: ReqSvcListDto): Promise<ResSvcListDto> {
    let result: ResSvcListDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('PAGE_NO', reqData.PAGE_NO)
        .input('PAGE_SIZE', reqData.PAGE_SIZE)
        .input('COMPANY_NAME', reqData.COMPANY_NAME)
        .input('SERVICE_NAME', reqData.SERVICE_NAME)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBSvcListDto>('PROC_GET_A_SERVICE_LIST');

      result = getListResult<DBSvcListDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 서비스 등록 */
  async setInsert(
    reqData: ReqServiceInsertDto,
    reqFiles: ReqServiceInsertFileDto,
    userId: number,
  ): Promise<ResServiceInsertDto> {
    let result: ResServiceInsertDto = getDefaultResult;

    try {
      const imgInfos: ServiceImgInsertDto[] = [];
      const reqImgInfos: ServiceImgInsertDto[] = JSON.parse(reqData.IMG_INFOS);

      await Promise.all(
        reqFiles.IMGS.map(async (img, idx) => {
          if (img) {
            // s3 에 file upload 실행
            const uploadResult = await this.uploadService.upload(
              [img],
              'images/서비스',
            );

            // 만약 정상 업로드 되었다면
            if (uploadResult.RESULT) {
              const reqInfo = reqImgInfos.find(
                (val) => val.FILE_NAME === img.originalname,
              );
              const MAIN_YN = reqInfo.MAIN_YN;
              const MAIN_EVENT_YN = reqInfo.MAIN_EVENT_YN;
              const SORT = reqInfo.SORT;
              const IMG_URL = uploadResult.DATA?.[0];

              imgInfos.push({
                IMG_URL,
                MAIN_EVENT_YN,
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
          .input('COMPANY_ID', reqData.COMPANY_ID)
          .input('NAME', reqData.NAME)
          .input('SHOT_DESC', reqData.SHORT_DESC)
          .input('DESC', reqData.DESC)
          .input('DEL_YN', reqData.DEL_YN)
          .input('CATEG_CD', reqData.CATEG_CD)
          .input('IMG_INFOS_JSON', JSON.stringify(imgInfos))
          .output('RET_CODE', VarChar(10))
          .output('RET_MSG', VarChar(500))
          .execute<BaseDto>('PROC_SET_A_SERVICE_INSERT');

        result = getBaseResult(dbResult);
      }
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 서비스 수정 */
  async setModify(
    reqData: ReqServiceModifyDto,
    reqFiles: ReqServiceModifyFileDto,
    userId: number,
  ): Promise<ResServiceModifyDto> {
    let result: ResServiceModifyDto = getDefaultResult;

    try {
      const imgInfos: ServiceImgModifyDto[] = [];
      const reqImgInfos: ServiceImgModifyDto[] = JSON.parse(reqData.IMG_INFOS);
      const reqDelImgs: ServiceImgDelDto[] = JSON.parse(reqData.DEL_IMGS);

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
                'images/서비스',
              );

              // 만약 정상 업로드 되었다면
              if (uploadResult.RESULT) {
                const reqInfo = reqImgInfos.find(
                  (val) => val.FILE_NAME === img.originalname,
                );
                const IMAGE_ID = reqInfo.IMAGE_ID;
                const MAIN_YN = reqInfo.MAIN_YN;
                const MAIN_EVENT_YN = reqInfo.MAIN_EVENT_YN;
                const SORT = reqInfo.SORT;
                const FILE_NAME = reqInfo.FILE_NAME;
                const IMG_URL = uploadResult.DATA?.[0];

                imgInfos.push({
                  FILE_NAME,
                  IMG_URL,
                  MAIN_YN,
                  MAIN_EVENT_YN,
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
        .input('SERVICE_ID', reqData.SERVICE_ID)
        .input('USER_ID', userId)
        .input('NAME', reqData.NAME)
        .input('SHORT_DESC', reqData.SHORT_DESC)
        .input('DESC', reqData.DESC)
        .input('CATEG_CD', reqData.CATEG_CD)
        .input('DEL_YN', reqData.DEL_YN)
        .input('DEL_IMGS', reqDelImgs.map((v) => v.IMAGE_ID).join(','))
        .input('IMG_INFOS_JSON', JSON.stringify(imgInfos))
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<BaseDto>('PROC_SET_A_SERVICE_MODIFY');

      result = getBaseResult(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 서비스 상세 */
  async getDetail(reqData: ReqServiceDetailDto): Promise<ResServiceDetailDto> {
    let result: ResServiceDetailDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('SERVICE_ID', reqData.SERVICE_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBServiceDetailDto>('PROC_GET_A_SERVICE_DETAIL');

      result = getDetailResult<DBServiceDetailDto>(dbResult);

      const dbImageListResult = await this.getImageList(reqData);

      if (result.DATA) {
        result.DATA.IMG_INFOS = [];

        dbImageListResult.DATA?.forEach((val) =>
          result.DATA.IMG_INFOS.push({
            IMAGE_ID: val.IMAGE_ID,
            IMG_URL: val.IMG_URL,
            MAIN_YN: val.MAIN_YN,
            MAIN_EVENT_YN: val.MAIN_EVENT_YN,
          }),
        );
      }
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 서비스 이미지 리스트 */
  async getImageList(reqData: ReqServiceImageDto): Promise<ResServiceImageDto> {
    let result: ResServiceImageDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('SERVICE_ID', reqData.SERVICE_ID)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBServiceImageDto>('PROC_GET_A_SERVICE_IMG_LIST');

      result = getListResult<DBServiceImageDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
