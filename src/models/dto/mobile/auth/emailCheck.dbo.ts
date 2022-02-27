import { User } from '~/src/models/entity/user.entity';
import { PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';

/** req EMAIL 중복 체크  */
export class ReqEmailChcekDto extends PickType(User, ['EMAIL']) {}

/** res EMAIL 중복 체크 */
export class ResEmailChcekDto extends DetailDto<DBEmailChcekDto> {}

/** db EMAIL 중복 체크 */
export class DBEmailChcekDto {}
