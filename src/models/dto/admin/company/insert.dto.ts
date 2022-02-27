import { Company } from '~/src/models/entity/company.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { BaseDto, PagingDto } from '~/dto/base.dto';
import { User } from '~/entity/user.entity';

/** req 기업정보 등록 */
export class ReqCompanyInsertDto extends IntersectionType(
  PickType(User, ['USER_ID'] as const),
  PickType(Company, [
    'NAME',
    'SHORT_DESC',
    'DESC',
    'TEL_NO',
    'ADDR',
    'ZIP_CODE',
    'OWNER',
    'BUSINESS_NO',
    'HASH_TAG',
    'LAT',
    'LON',
  ] as const),
) {
  /** CompanyImageInfoDto[] 형식의 JSON string */
  IMG_INFOS: string;
}

/** 기업 이미지 등록 정보 */
export class CompanyImgInsertDto {
  IMAGE_ID?: number;
  FILE_NAME?: string;
  MAIN_YN?: 'Y' | 'N';
  IMG_URL?: string;
  SORT?: number;
  UPLOAD_SUCCESS_YN: 'Y' | 'N';
}

/** req 기업정보 등록 이미지들 */
export class ReqCompanyInsertFileDto {
  IMGS: Express.Multer.File[];
}

/** res 기업정보 등록 */
export class ResCompanyInsertDto extends BaseDto {}
