import { Service } from '~/src/models/entity/service.entity';
import { Image } from '~/entity/image.entity';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { ListDto, PagingDto } from '~/dto/base.dto';
import { User } from '~/entity/user.entity';

/** req 유저 리스트 */
export class ReqUserListDto extends PagingDto {
  GUBUN_CD: string;
  EMAIL: string;
  PHONE_NO: string;
  SORT_COL: string;
  SORT: string;
}

/** res 서비스 리스트 */
export class ResUserListDto extends ListDto<DBUserListDto> {}

/** db 서비스 리스트 */
export class DBUserListDto extends IntersectionType(
  PickType(User, [
    'USER_ID',
    'GUBUN_CD',
    'EMAIL',
    'NICK_NAME',
    'AGE_GROUP',
    'PHONE_NO',
    'ADDR1',
    'ADDR2',
    'MY_ADDR',
    'SEX',
    'REG_DT',
  ] as const),
  PickType(Image, ['IMG_URL'] as const),
) {
  LIST_NUM: number;
  TOTAL_COUNT: number;
  GUBUN_CD_NAME: string;
  SEX_CODE_NAME: string;
}
