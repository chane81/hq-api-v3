import { User } from '~/src/models/entity/user.entity';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';

/** req 비밀번호 초기화 */
export class ReqPwdInitDto extends PickType(User, ['PHONE_NO'] as const) {}

/**
 * res 비밀번호 초기화
 * EMAIL: 초기화한 이메일(마스킹된)
 * PWD: 초기화로 변경된 비번
 */
export class ResPwdInitDto extends DetailDto<DBPwdInitDto> {}

/**
 * db 비밀번호 초기화
 * EMAIL: 초기화한 이메일(마스킹된)
 * PWD: 초기화로 변경된 비번
 */
export class DBPwdInitDto extends PartialType(
  PickType(User, ['EMAIL', 'PWD'] as const),
) {}
