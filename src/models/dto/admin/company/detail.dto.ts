import { Company } from '~/src/models/entity/company.entity';
import { PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';
import { DBCompanyImageDto } from '~/dto/admin/company/image.dto';
import { StrictOmit } from 'ts-essentials';

/** req 기업 상세 */
export class ReqCompanyDetailDto extends PickType(Company, [
  'COMPANY_ID',
] as const) {}

/** res 기업 상세 */
export class ResCompanyDetailDto extends DetailDto<DBCompanyDetailDto> {}

/** db 기업 상세 */
export class DBCompanyDetailDto extends PickType(Company, [
  'COMPANY_ID',
  'NAME',
  'SHORT_DESC',
  'DESC',
  'ADDR',
  'OWNER',
  'HASH_TAG',
  'TEL_NO',
  'LAT',
  'LON',
] as const) {
  IMG_INFOS: StrictOmit<DBCompanyImageDto, 'COMPANY_ID' | 'TOTAL_COUNT'>[];
}
