import { BaseDto } from '~/dto/base.dto';
import { ServiceImgInsertDto, ReqServiceInsertDto } from './insert.dto';

/** req 서비스정보 수정 */
export class ReqServiceModifyDto extends ReqServiceInsertDto {
  SERVICE_ID: number;

  // 삭제대상 이미지 - CompanyImgDelDto[] 형식의 JSON string
  DEL_IMGS: string;
}

/** 서비스 삭제대상 이미지 정보 */
export class ServiceImgDelDto {
  IMAGE_ID?: number;
  IMG_URL?: string;
}

/** 서비스 이미지 수정 정보 */
export class ServiceImgModifyDto extends ServiceImgInsertDto {
  IMAGE_ID?: number;
}

/** req 서비스 수정 이미지들 */
export class ReqServiceModifyFileDto {
  IMGS: Express.Multer.File[];
}

/** res 기업정보 수정 */
export class ResServiceModifyDto extends BaseDto {}
