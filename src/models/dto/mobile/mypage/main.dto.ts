import { PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';
import { User } from '~/entity/user.entity';

/** req 마이페이지 메인 */
export class ReqMypageMainDto extends PickType(User, ['USER_ID' as const]) {}

/** res 마이페이지 메인 */
export class ResMypageMainDto extends DetailDto<DBMypageMainDto> {}

/** db 마이페이지 메인 */
export class DBMypageMainDto {
  TREE_COUPON_COUNT: number;
  E_COUPON_COUNT: number;
  SERVICE_USE_COUNT: number;
  REVIEW_COUNT: number;
}
