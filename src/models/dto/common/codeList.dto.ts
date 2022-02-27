import { PartialType, PickType } from '@nestjs/mapped-types';
import { Code } from '~/entity/code.entity';
import { ListDto } from '../base.dto';

/** req 공통코드 리스트 */
export class ReqCodeListDto extends PartialType(
  PickType(Code, ['GROUP_ID', 'CD'] as const),
) {}

/** res 공통코드 리스트 */
export class ResCodeListDto extends ListDto<DBCodeListDto> {}

/** db 공통코드 리스트 */
export class DBCodeListDto extends PickType(Code, [
  'GROUP_ID',
  'CD',
  'NAME',
  'ETC_1',
  'ETC_2',
  'ETC_3',
  'ETC_4',
]) {
  TOTAL_COUNT: number;
}
