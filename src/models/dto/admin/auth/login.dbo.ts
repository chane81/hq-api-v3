import { User } from '~/src/models/entity/user.entity';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';

/** req 로그인 */
export class ReqLoginDto extends PickType(User, ['EMAIL', 'PWD'] as const) {}

/** res 로그인 */
export class ResLoginDto extends DetailDto<DBLoginDto> {}

/** db 로그인 */
export class DBLoginDto extends PartialType(
  OmitType(User, ['DEL_YN', 'MOD_DT', 'REG_DT', 'PWD']),
) {}
