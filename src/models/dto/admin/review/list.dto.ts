import { Company } from '~/src/models/entity/company.entity';
import { Service } from '~/src/models/entity/service.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Review } from '~/entity/review.entity';
import { User } from '~/entity/user.entity';
import { ListDto, PagingDto } from '~/dto/base.dto';

/** req 리뷰 리스트 */
export class ReqReviewListDto extends PagingDto {
  SORT_COL: string;
  SORT: string;
}

/** res 리뷰 리스트 */
export class ResReviewListDto extends ListDto<DBReviewListDto> {}

/** res 리뷰 리스트 */
export class DBReviewListDto extends IntersectionType(
  PickType(Company, ['COMPANY_ID'] as const),
  PickType(Service, ['SERVICE_ID'] as const),
  PickType(Review, ['REVIEW_ID', 'USED_GRADE', 'REG_DT', 'CONTENTS'] as const),
  PickType(User, ['NICK_NAME', 'EMAIL'] as const),
) {
  LIST_NUM: number;
  TOTAL_COUNT: number;
  COMPANY_NAME: string;
  SERVICE_NAME: string;
}
