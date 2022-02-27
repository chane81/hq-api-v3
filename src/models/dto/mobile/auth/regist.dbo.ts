import { User } from '~/src/models/entity/user.entity';
import { PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';

/** req 회원가입 및 등록 */
export class ReqRegistDto extends PickType(User, [
  'EMAIL',
  'NICK_NAME',
  'PWD',
  'AGE_GROUP',
  'ADDR1',
  'ADDR2',
  'SEX',
  'PHONE_NO',
  'MY_ADDR',
] as const) {}

/**
 * res 회원가입 및 등록
 * ID: 가입 사용자 SEQ_NO
 */
export class ResRegistDto extends DetailDto<DBRegistDto> {}

/**
 * db 회원가입 및 등록
 * ID: 가입 사용자 SEQ_NO
 */
export class DBRegistDto extends PickType(User, ['USER_ID'] as const) {}
