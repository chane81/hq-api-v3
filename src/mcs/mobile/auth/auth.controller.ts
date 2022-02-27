import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { AuthService } from './auth.service';
import { ReqLoginDto, ResLoginDto } from '~/dto/mobile/auth/login.dbo';
import { ReqRegistDto, ResRegistDto } from '~/dto/mobile/auth/regist.dbo';
import { ReqPwdInitDto, ResPwdInitDto } from '~/dto/mobile/auth/pwdInit.dbo';
import {
  ReqEmailChcekDto,
  ResEmailChcekDto,
} from '~/dto/mobile/auth/emailCheck.dbo';
import {
  ReqNickNameCheckDto,
  ResNickNameCheckDto,
} from '~/dto/mobile/auth/nickNameCheck.dbo';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 로그인 */
  @Get('setLogin')
  async setLogin(@Query() reqData: ReqLoginDto): Promise<ResLoginDto> {
    const result = await this.authService.setLogin(reqData);

    return result;
  }

  /** 사용자 가입 및 등록 */
  @Get('setRegist')
  async setRegist(@Query() reqData: ReqRegistDto): Promise<ResRegistDto> {
    const result = await this.authService.setRegist(reqData);

    return result;
  }

  /** 비밀번호 초기화 */
  @Get('setInitPwd')
  async setInitPwd(@Query() reqData: ReqPwdInitDto): Promise<ResPwdInitDto> {
    const result = await this.authService.setInitPwd(reqData);

    return result;
  }

  /** 이메일 중복 체크  */
  @Get('getEmailCheck')
  async getEmailCheck(
    @Query() reqData: ReqEmailChcekDto,
  ): Promise<ResEmailChcekDto> {
    const result = await this.authService.getEmailCheck(reqData);

    return result;
  }

  /** 닉네임 중복 체크  */
  @Get('getNickNameCheck')
  async getNickNameCheck(
    @Query() reqData: ReqNickNameCheckDto,
  ): Promise<ResNickNameCheckDto> {
    const result = await this.authService.getNickNameCheck(reqData);

    return result;
  }
}
