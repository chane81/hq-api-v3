import { User } from '~/src/models/entity/user.entity';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';

/** req 로그인 */
export class ReqLoginDto extends PickType(User, ['EMAIL', 'PWD'] as const) {}

/** res 로그인 */
export class ResLoginDto extends DetailDto<DBLoginDto> {}

/** res 로그인 */
export class DBLoginDto extends PartialType(
  OmitType(User, ['DEL_YN', 'MOD_DT', 'REG_DT', 'PWD']),
) {
  /** 쿠폰 개수 */
  COUPON_COUNT: number;

  /** 서비스 확정 개수 */
  SERVICE_USE_COUNT: number;
}
