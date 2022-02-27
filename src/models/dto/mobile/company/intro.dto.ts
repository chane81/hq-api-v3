import { Company } from '~/src/models/entity/company.entity';
import { PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';

/** req 기업 소개 */
export class ReqCompanyIntroDto extends PickType(Company, ['COMPANY_ID']) {}

/** res 기업 소개 */
export class ResCompanyIntroDto extends DetailDto<DBCompanyIntroDto> {}

/** db 기업 소개 */
export class DBCompanyIntroDto extends PickType(Company, [
  'NAME',
  'DESC',
  'ZIP_CODE',
  'ADDR',
  'OWNER',
  'BUSINESS_NO',
  'TEL_NO',
  'HASH_TAG',
  'LAT',
  'LON',
] as const) {}
