import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Image } from '~/entity/image.entity';
import { ListDto } from '~/dto/base.dto';
import { Service } from '~/entity/service.entity';

/** req 서비스에 해당하는 이미지 */
export class ReqServiceImageDto extends PickType(Service, ['SERVICE_ID']) {}

/** res 서비스에 해당하는 이미지 */
export class ResServiceImageDto extends ListDto<DBServiceImageDto> {}

/** db 서비스에 해당하는 이미지 */
export class DBServiceImageDto extends IntersectionType(
  PickType(Service, ['SERVICE_ID'] as const),
  PickType(Image, ['IMAGE_ID', 'IMG_URL', 'MAIN_YN', 'MAIN_EVENT_YN'] as const),
) {
  TOTAL_COUNT: number;
}
