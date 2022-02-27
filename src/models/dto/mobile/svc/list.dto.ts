import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Service } from '~/entity/service.entity';
import { Image } from '~/entity/image.entity';
import { Company } from '~/entity/company.entity';
import { ListDto } from '~/dto/base.dto';

/** req 해당 기업의 서비스 리스트 */
export class ReqSvcListDto extends PickType(Company, ['COMPANY_ID'] as const) {}

/** res 해당 기업의 서비스 리스트 */
export class ResSvcListDto extends ListDto<DBSvcListDto> {}

/** db 해당 기업의 서비스 리스트 */
export class DBSvcListDto extends IntersectionType(
  PickType(Service, ['SERVICE_ID'] as const),
  PickType(Company, ['COMPANY_ID', 'NAME', 'SHORT_DESC'] as const),
  PickType(Image, ['IMG_URL'] as const),
) {
  TOTAL_COUNT: number;
}
