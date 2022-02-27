import { PickType } from '@nestjs/mapped-types';
import { ListDto } from '~/dto/base.dto';
import { Image } from '~/entity/image.entity';
import { Review } from '~/entity/review.entity';

/** req 리뷰 이미지 */
export class ReqReviewImageDto extends PickType(Review, ['REVIEW_ID']) {}

/** res 리뷰 이미지 */
export class ResReviewImageDto extends ListDto<DBReviewImageDto> {}

/** db 리뷰 이미지 */
export class DBReviewImageDto extends PickType(Image, [
  'IMAGE_ID',
  'IMG_URL',
] as const) {
  TOTAL_COUNT: number;
}
