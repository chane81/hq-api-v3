import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Service } from '~/entity/service.entity';
import { Image } from '~/entity/image.entity';
import { ListDto } from '~/dto/base.dto';

/** req 서비스에 해당하는 이미지 */
export class ReqSvcImageDto extends PickType(Service, ['SERVICE_ID']) {}

/** res 서비스에 해당하는 이미지 */
export class ResSvcImageDto extends ListDto<DBSvcImageDto> {}

/** res 서비스에 해당하는 이미지 */
export class DBSvcImageDto extends IntersectionType(
  PickType(Service, ['SERVICE_ID'] as const),
  PickType(Image, ['IMG_URL'] as const),
) {
  TOTAL_COUNT: number;
}
