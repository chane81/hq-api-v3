import { BaseDto } from '~/dto/base.dto';
import { CompanyImgInsertDto, ReqCompanyInsertDto } from './insert.dto';

/** req 기업정보 수정 */
export class ReqCompanyModifyDto extends ReqCompanyInsertDto {
  COMPANY_ID: number;

  // 삭제대상 이미지 - CompanyImgDelDto[] 형식의 JSON string
  DEL_IMGS: string;
}

/** 기업 삭제대상 이미지 정보 */
export class CompanyImgDelDto {
  IMAGE_ID?: number;
  IMG_URL?: string;
}

/** 기업 이미지 수정 정보 */
export class CompanyImgModifyDto extends CompanyImgInsertDto {
  IMAGE_ID?: number;
}

/** req 기업정보 수정 이미지들 */
export class ReqCompanyModifyFileDto {
  IMGS: Express.Multer.File[];
}

/** res 기업정보 수정 */
export class ResCompanyModifyDto extends BaseDto {}
