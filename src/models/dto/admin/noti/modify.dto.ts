import { PickType } from '@nestjs/mapped-types';
import { BaseDto } from '~/dto/base.dto';
import { Board } from '~/entity/board.entity';

/** req 공지 수정 */
export class ReqNotiModifyDto extends PickType(Board, [
  'BOARD_ID',
  'TITLE',
  'SHORT_DESC',
  'CONTENTS',
  'URL_1',
  'URL_2',
  'URL_3',
  'USE_YN',
] as const) {}

/** res 공지정보 수정 */
export class ResNotiModifyDto extends BaseDto {}
