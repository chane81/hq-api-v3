import { PickType, IntersectionType, PartialType } from '@nestjs/mapped-types';
import { DetailDto, ListDto } from '~/dto/base.dto';
import { Board } from '~/entity/board.entity';
import { Image } from '~/entity/image.entity';

/** res 공지 리스트 */
export class ResNotiListDto extends ListDto<DBNotiListDto> {}

/** db 공지 리스트 */
export class DBNotiListDto extends PickType(Board, [
  'BOARD_ID',
  'TITLE',
  'SHORT_DESC',
  'REG_DT',
]) {
  TOTAL_COUNT: number;
  NEW_YN: 'Y' | 'N';
}

/** req 공지 상세 */
export class ReqNotiDetailDto extends PickType(Board, ['BOARD_ID']) {}

/** res 공지 상세 */
export class ResNotiDetailDto extends DetailDto<DBNotiDetailDto> {}

/** db 공지 상세 */
export class DBNotiDetailDto extends PartialType(
  IntersectionType(
    PickType(Board, [
      'BOARD_ID',
      'TITLE',
      'CONTENTS',
      'REG_DT',
      'URL_1',
      'URL_2',
      'URL_3',
    ] as const),
    PickType(Image, ['IMAGE_ID'] as const),
  ),
) {}
