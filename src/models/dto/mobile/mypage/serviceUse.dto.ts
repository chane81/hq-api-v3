import { PickType, IntersectionType } from '@nestjs/mapped-types';
import { ListDto } from '~/dto/base.dto';
import { Service } from '~/entity/service.entity';
import { ServiceUse } from '~/entity/serviceUse.entity';
import { User } from '~/entity/user.entity';

/** req 마이페이지 서비스 이용 내역 */
export class ReqMypageServiceListDto extends IntersectionType(
  PickType(User, ['USER_ID' as const]),
  PickType(Service, ['SERVICE_ID']),
) {}

/** res 마이페이지 서비스 이용 내역 */
export class ResMypageServiceListDto extends ListDto<DBMypageServiceListDto> {}

/** db 마이페이지 서비스 이용 내역 */
export class DBMypageServiceListDto extends IntersectionType(
  PickType(Service, ['COMPANY_ID', 'SERVICE_ID']),
  PickType(ServiceUse, ['SERVICE_ID', 'SERVICE_USE_ID', 'CONFIRM_DT']),
) {
  /** 총 카운트 */
  TOTAL_COUNT: number;
  /** 회사명 */
  COMPANY_NAME: string;
  /** 서비스명 */
  SERVICE_NAME: string;
  /** 리뷰 작성 여부 Y/N */
  REVIEW_YN: string;
}
