import { Service } from '~/src/models/entity/service.entity';
import { Image } from '~/entity/image.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { ListDto, PagingDto } from '~/dto/base.dto';

/** req 서비스 리스트 */
export class ReqSvcListDto extends PagingDto {
  COMPANY_NAME: string;
  SERVICE_NAME: string;
}

/** res 서비스 리스트 */
export class ResSvcListDto extends ListDto<DBSvcListDto> {}

/** db 서비스 리스트 */
export class DBSvcListDto extends IntersectionType(
  PickType(Service, ['COMPANY_ID', 'SERVICE_ID', 'SHORT_DESC'] as const),
  PickType(Image, ['IMG_URL'] as const),
) {
  LIST_NUM: number;
  TOTAL_COUNT: number;
  COMPANY_NAME: string;
  SERVICE_NAME: string;
}
