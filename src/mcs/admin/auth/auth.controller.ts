import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ReqLoginDto, ResLoginDto } from '~/dto/admin/auth/login.dbo';
import { AuthService } from '~/mcs/admin/auth/auth.service';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { ISession } from '~/types/sessionType';
import { sessionDestory } from '~/utils/sessionUtils';
import { BaseDto } from '~/dto/base.dto';
import { getErrorResult } from '~/utils/result.util';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 로그인 */
  @Post('setLogin')
  async setLogin(
    @Body() reqData: ReqLoginDto,
    @Req() req: Request,
  ): Promise<ResLoginDto> {
    const result = await this.authService.setLogin(reqData);

    // 세션에 사용자 정보 저장
    const sess = req.session as ISession;
    sess.USER_ID = result.DATA.USER_ID;
    sess.NICK_NAME = result.DATA.NICK_NAME;
    sess.PHONE_NO = result.DATA.PHONE_NO;
    sess.SEX = result.DATA.SEX;
    sess.EMAIL = result.DATA.EMAIL;
    sess.GUBUN_CD = result.DATA.GUBUN_CD;

    return result;
  }

  /** 로그아웃 */
  @Post('setLogout')
  async getLogout(@Req() req: Request, @Res() res: Response) {
    let result: BaseDto = {
      RESULT: true,
      RESULT_CODE: '00',
      RESULT_MSG: '정상',
    };

    try {
      sessionDestory(req, res);
    } catch (ex) {
      result = getErrorResult(ex, req);
    }

    res.json(result);
  }

  /** 로그인 세션 체크 */
  @Get('getLoginCheck')
  async getLoginCheck(@Session() session: ISession, @Res() res: Response) {
    let result: BaseDto = {
      RESULT: true,
      RESULT_CODE: '00',
      RESULT_MSG: '정상',
    };

    if (!session.USER_ID) {
      result.RESULT = false;
      result.RESULT_CODE = '401';
      result.RESULT_MSG = 'Unauthorized';

      res.status(401).json(result);
    } else {
      res.status(200).json(result);
    }
  }
}
