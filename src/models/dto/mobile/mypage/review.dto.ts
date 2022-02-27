import { PickType, IntersectionType } from '@nestjs/mapped-types';
import { BaseDto, ListDto } from '~/dto/base.dto';
import { Review } from '~/entity/review.entity';
import { ServiceUse } from '~/entity/serviceUse.entity';
import { User } from '~/entity/user.entity';

/** req 마이페이지 리뷰 리스트 */
export class ReqMypageReviewListDto extends PickType(User, ['USER_ID' as const]) {}

/** res 마이페이지 리뷰 리스트 */
export class ResMypageReviewListDto extends ListDto<DBMypageReviewListDto> {}

/** db 마이페이지 리뷰 리스트 */
export class DBMypageReviewListDto {
  /** 총 카운트 */
  TOTAL_COUNT: number;
  /** 회사명 */
  COMPANY_NAME: string;
  /** 회사 ID */
  COMPANY_ID: number;
  /** 서비스 ID */
  SERVICE_ID: number;
  /** 리뷰 ID */
  REVIEW_ID: number;
  /** 서비스명 */
  SERVICE_NAME: string;
  /** 별점 */
  USED_GRADE: number;
  /** 닉네임 */
  NICK_NAME: string;
  /** 등록일 */
  REG_DT: string;
  /** 리뷰 내용 */
  CONTENTS: string;
  /** 리뷰 이미지들 */
  REVIEW_IMG_URL_1: string;
  REVIEW_IMG_URL_2: string;
  REVIEW_IMG_URL_3: string;
  REVIEW_IMG_URL_4: string;
  REVIEW_IMG_URL_5: string;
}

/** req 마이페이지 리뷰 쓰기 */
export class ReqMypageReviewInsertDto extends IntersectionType(
  PickType(User, ['USER_ID' as const]),
  PickType(ServiceUse, ['SERVICE_USE_ID'] as const),
  PickType(Review, ['USED_GRADE', 'CONTENTS'] as const),
) {}

/** req 리뷰 이미지들 */
export class ReqMypageReviewInsertFileDto {
  IMG_1?: Express.Multer.File[];
  IMG_2?: Express.Multer.File[];
  IMG_3?: Express.Multer.File[];
  IMG_4?: Express.Multer.File[];
  IMG_5?: Express.Multer.File[];
}

/** res 마이페이지 리뷰 쓰기 */
export class ResMypageReviewInsertDto extends BaseDto {
  /** e-무료쿠폰발행여부 (Y or N) */
  ECOUPON_YN?: string;
}
