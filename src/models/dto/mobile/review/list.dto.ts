import { Company } from '~/src/models/entity/company.entity';
import { Service } from '~/src/models/entity/service.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Review } from '~/entity/review.entity';
import { User } from '~/entity/user.entity';
import { ListDto } from '~/dto/base.dto';

/** req 리뷰 리스트 */
export class ReqReviewListDto extends PickType(Company, ['COMPANY_ID'] as const) {}

/** res 리뷰 리스트 */
export class ResReviewListDto extends ListDto<DBReviewListDto> {
  /** 평균 별점 */
  AVERAGE_USED_GRADE?: number;
}

/** res 리뷰 리스트 */
export class DBReviewListDto extends IntersectionType(
  PickType(Company, ['COMPANY_ID'] as const),
  PickType(Service, ['SERVICE_ID'] as const),
  PickType(Review, ['REVIEW_ID', 'USED_GRADE', 'REG_DT', 'CONTENTS'] as const),
  PickType(User, ['NICK_NAME'] as const),
) {
  /** 총 카운트 */
  TOTAL_COUNT: number;
  /** 서비스명 */
  SERVICE_NAME: string;
  /** 별점 평균 */
  AVERAGE_USED_GRADE: number;
  /** 리뷰 이미지 개수 */
  REVIEW_IMG_COUNT: number;
  /** 리뷰 이미지들 */
  REVIEW_IMG_URL_1: string;
  REVIEW_IMG_URL_2: string;
  REVIEW_IMG_URL_3: string;
  REVIEW_IMG_URL_4: string;
  REVIEW_IMG_URL_5: string;
}
