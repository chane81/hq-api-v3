import { Company } from '~/src/models/entity/company.entity';
import { Service } from '~/src/models/entity/service.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { User } from '~/entity/user.entity';
import { ListDto, PagingDto } from '~/dto/base.dto';

/** req 쿠폰 리스트 */
export class ReqCouponListDto extends PagingDto {
  SORT_COL: string;
  SORT: string;
}

/** res 쿠폰 리스트 */
export class ResCouponListDto extends ListDto<DBCouponListDto> {}

/** res 쿠폰 리스트 */
export class DBCouponListDto extends IntersectionType(
  PickType(User, ['NICK_NAME', 'EMAIL'] as const),
  PickType(Company, ['COMPANY_ID'] as const),
  PickType(Service, ['SERVICE_ID'] as const),
) {
  LIST_NUM: number;
  TOTAL_COUNT: number;
  COMPANY_NAME: string;
  SERVICE_NAME: string;
  SERVICE_USE_DT: string;
  COUPON_NAME: string;
  REVIEW_YN: 'Y' | 'N';
}
