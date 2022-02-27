import { PickType } from '@nestjs/mapped-types';
import { DetailDto } from '~/dto/base.dto';
import { Board } from '~/entity/board.entity';

/** req 공지 상세 */
export class ReqNotiDetailDto extends PickType(Board, ['BOARD_ID'] as const) {}

/** res 공지 상세 */
export class ResNotiDetailDto extends DetailDto<DBNotiDetailDto> {}

/** db 공지 상세 */
export class DBNotiDetailDto extends PickType(Board, [
  'BOARD_ID',
  'TITLE',
  'SHORT_DESC',
  'CONTENTS',
  'URL_1',
  'URL_2',
  'URL_3',
  'USE_YN',
] as const) {}
