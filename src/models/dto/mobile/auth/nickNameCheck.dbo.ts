import { User } from '~/src/models/entity/user.entity';
import { PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';

/** req NICK_NAME 중복 체크  */
export class ReqNickNameCheckDto extends PickType(User, ['NICK_NAME']) {}

/** res NICK_NAME 중복 체크 */
export class ResNickNameCheckDto extends DetailDto<DBNickNameCheckDto> {}

/** res NICK_NAME 중복 체크 */
export class DBNickNameCheckDto {}
