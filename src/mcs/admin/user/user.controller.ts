import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { UserService } from './user.service';
import { ReqSvcListDto, ResSvcListDto } from '~/dto/admin/svc/list.dto';
import { AuthGuard } from '~/mcs/auth/auth.guard';
import { ReqUserListDto, ResUserListDto } from '~/dto/admin/user/list.dto';

@UseGuards(AuthGuard)
@Controller()
@UseFilters(new AllExceptionsFilter())
export class UserController {
  constructor(private readonly svcService: UserService) {}

  /** 유저 리스트 */
  @Get('getUserList')
  async getUserList(@Query() reqData: ReqUserListDto): Promise<ResUserListDto> {
    const result = await this.svcService.getUserList(reqData);

    return result;
  }
}
