import { Company } from '~/src/models/entity/company.entity';
import { Service } from '~/src/models/entity/service.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';
import { DBServiceImageDto } from '~/dto/admin/svc/image.dto';
import { StrictOmit } from 'ts-essentials';

/** req 서비스 상세 */
export class ReqServiceDetailDto extends PickType(Service, [
  'SERVICE_ID',
] as const) {}

/** res 서비스 상세 */
export class ResServiceDetailDto extends DetailDto<DBServiceDetailDto> {}

/** db 서비스 상세 */
export class DBServiceDetailDto extends IntersectionType(
  PickType(Company, ['COMPANY_ID'] as const),
  PickType(Service, ['NAME', 'SHORT_DESC', 'DESC', 'CATEG_CD', 'DEL_YN'] as const),
) {
  IMG_INFOS: StrictOmit<DBServiceImageDto, 'SERVICE_ID' | 'TOTAL_COUNT'>[];
}
