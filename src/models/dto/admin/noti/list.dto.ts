import { PickType } from '@nestjs/mapped-types';
import { ListDto, PagingDto } from '~/dto/base.dto';
import { Board } from '~/entity/board.entity';

/** req 공지 리스트 */
export class ReqNotiListDto extends PagingDto {
  SORT_COL: string;
  SORT: string;
}

/** res 공지 리스트 */
export class ResNotiListDto extends ListDto<DBNotiListDto> {}

/** db 공지 리스트 */
export class DBNotiListDto extends PickType(Board, [
  'BOARD_ID',
  'TITLE',
  'SHORT_DESC',
  'USE_YN',
  'REG_DT',
  'MOD_DT',
] as const) {
  LIST_NUM: number;
  TOTAL_COUNT: number;
}
