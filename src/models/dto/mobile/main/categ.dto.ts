import { PickType } from '@nestjs/mapped-types';
import { ListDto } from '~/dto/base.dto';
import { Code } from '~/entity/code.entity';

/** res 메인 카테고리 */
export class ResMainCategDto extends ListDto<DBMainCategDto> {}

/** db 메인 카테고리 */
export class DBMainCategDto extends PickType(Code, ['CD', 'NAME'] as const) {
  TOTAL_COUNT: number;
}
