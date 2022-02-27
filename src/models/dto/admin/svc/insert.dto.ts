import { Company } from '~/src/models/entity/company.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { BaseDto, PagingDto } from '~/dto/base.dto';
import { User } from '~/entity/user.entity';
import { Service } from '~/entity/service.entity';

/** req 서비스정보 등록 */
export class ReqServiceInsertDto extends IntersectionType(
  PickType(Company, ['COMPANY_ID'] as const),
  PickType(Service, ['NAME', 'SHORT_DESC', 'DESC', 'DEL_YN', 'CATEG_CD'] as const),
) {
  /** ServiceImageInfoDto[] 형식의 JSON string */
  IMG_INFOS: string;
}

/** 서비스 이미지 등록 정보 */
export class ServiceImgInsertDto {
  IMAGE_ID?: number;
  FILE_NAME?: string;
  MAIN_EVENT_YN?: 'Y' | 'N';
  MAIN_YN?: 'Y' | 'N';
  IMG_URL?: string;
  SORT?: number;
  UPLOAD_SUCCESS_YN: 'Y' | 'N';
}

/** req 서비스정보 등록 이미지들 */
export class ReqServiceInsertFileDto {
  IMGS: Express.Multer.File[];
}

/** res 서비스정보 등록 */
export class ResServiceInsertDto extends BaseDto {}
