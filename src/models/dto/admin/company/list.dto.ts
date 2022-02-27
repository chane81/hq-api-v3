import { Company } from '~/src/models/entity/company.entity';
import { Service } from '~/src/models/entity/service.entity';
import { Image } from '~/entity/image.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { ListDto, PagingDto } from '~/dto/base.dto';

/** req 기업 리스트 */
export class ReqCompanyListDto extends IntersectionType(
  PickType(Service, ['CATEG_CD'] as const),
  PagingDto,
) {
  SCH_TEXT: string;
  SORT_COL: string;
  SORT: string;
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
    'ADDR',
    'OWNER',
    'HASH_TAG',
    'TEL_NO',
    'LAT',
    'LON',
  ] as const),
  PickType(Image, ['IMG_URL'] as const),
) {
  LIST_NUM: number;
  TOTAL_COUNT: number;
}
