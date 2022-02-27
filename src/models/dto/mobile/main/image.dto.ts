import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Service } from '~/entity/service.entity';
import { Image } from '~/entity/image.entity';
import { ListDto } from '~/dto/base.dto';

/** res 메인 이미지 */
export class ResMainImageDto extends ListDto<DBMainImageDto> {}

/** db 메인 이미지 */
export class DBMainImageDto extends IntersectionType(
  PickType(Service, ['SERVICE_ID', 'COMPANY_ID'] as const),
  PickType(Image, ['IMAGE_ID', 'IMG_URL'] as const),
) {
  TOTAL_COUNT: number;
}
