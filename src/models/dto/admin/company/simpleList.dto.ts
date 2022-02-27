import { Company } from '~/src/models/entity/company.entity';
import { PickType } from '@nestjs/mapped-types';
import { ListDto } from '~/dto/base.dto';

/** res 기업 간단 리스트 */
export class ResCompanySimpleListDto extends ListDto<DBCompanySimpleListDto> {}

/** db 기업 간단 리스트 */
export class DBCompanySimpleListDto extends PickType(Company, [
  'COMPANY_ID',
  'NAME',
] as const) {
  TOTAL_COUNT: number;
}
