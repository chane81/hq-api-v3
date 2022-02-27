import { Company } from '~/src/models/entity/company.entity';
import { Service } from '~/src/models/entity/service.entity';
import { Image } from '~/entity/image.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { ListDto } from '~/dto/base.dto';

/** req 기업 리스트 - 카테고리 검색은 기업이 가지고 있는 서비스의 카테고리내에서 검색 */
export class ReqCompanyListDto extends PickType(Service, ['CATEG_CD'] as const) {
  SCH_TEXT: string;
}

/** res 기업 리스트 */
export class ResCompanyListDto extends ListDto<DBCompanyListDto> {}

/** db 기업 리스트 */
export class DBCompanyListDto extends IntersectionType(
  PickType(Company, [
    'COMPANY_ID',
    'NAME',
    'SHORT_DESC',
    'DESC',
    'HASH_TAG',
    'LAT',
    'LON',
  ] as const),
  PickType(Image, ['IMG_URL'] as const),
) {
  TOTAL_COUNT: number;
}
