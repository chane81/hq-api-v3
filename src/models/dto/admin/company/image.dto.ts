import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Image } from '~/entity/image.entity';
import { Company } from '~/entity/company.entity';
import { ListDto } from '~/dto/base.dto';

/** req 기업에 해당하는 이미지 */
export class ReqCompanyImageDto extends PickType(Company, ['COMPANY_ID']) {}

/** res 기업에 해당하는 이미지 */
export class ResCompanyImageDto extends ListDto<DBCompanyImageDto> {}

/** db 기업에 해당하는 이미지 */
export class DBCompanyImageDto extends IntersectionType(
  PickType(Company, ['COMPANY_ID'] as const),
  PickType(Image, ['IMAGE_ID', 'IMG_URL', 'MAIN_YN'] as const),
) {
  TOTAL_COUNT: number;
}
