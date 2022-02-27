import { Injectable } from '@nestjs/common';
import { RepoService } from '~/repo/repo.service';
import { VarChar } from 'mssql';
import { DBLoginDto, ReqLoginDto, ResLoginDto } from '~/dto/mobile/auth/login.dbo';
import {
  DBRegistDto,
  ReqRegistDto,
  ResRegistDto,
} from '~/dto/mobile/auth/regist.dbo';
import {
  getDefaultResult,
  getDetailResult,
  getErrorResult,
} from '~/utils/result.util';
import {
  DBPwdInitDto,
  ReqPwdInitDto,
  ResPwdInitDto,
} from '~/dto/mobile/auth/pwdInit.dbo';
import { MailService } from '~/mcs/mail/mail.service';
import {
  DBEmailChcekDto,
  ReqEmailChcekDto,
  ResEmailChcekDto,
} from '~/dto/mobile/auth/emailCheck.dbo';
import {
  DBNickNameCheckDto,
  ReqNickNameCheckDto,
  ResNickNameCheckDto,
} from '~/dto/mobile/auth/nickNameCheck.dbo';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: RepoService,
    private readonly mail: MailService,
  ) {}

  /** 로그인 */
  async setLogin(reqData: ReqLoginDto): Promise<ResLoginDto> {
    let result: ResLoginDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('GUBUN', 'M')
        .input('EMAIL', reqData.EMAIL)
        .input('PWD', reqData.PWD)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBLoginDto>('PROC_GET_LOGIN_CHECK');

      result = getDetailResult<DBLoginDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 사용자 가입 및 등록 */
  async setRegist(reqData: ReqRegistDto): Promise<ResRegistDto> {
    let result: ResRegistDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .input('GUBUN_CD', 'M')
        .input('EMAIL', reqData.EMAIL)
        .input('NICK_NAME', reqData.NICK_NAME)
        .input('PWD', reqData.PWD)
        .input('AGE_GROUP', reqData.AGE_GROUP)
        .input('ADDR1', reqData.ADDR1)
        .input('ADDR2', reqData.ADDR2)
        .input('SEX', reqData.SEX)
        .input('PHONE_NO', reqData.PHONE_NO)
        .input('MY_ADDR', reqData.MY_ADDR)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBRegistDto>('PROC_SET_USER_REGIST');

      result = getDetailResult<DBRegistDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 비밀번호 초기화 */
  async setInitPwd(reqData: ReqPwdInitDto): Promise<ResPwdInitDto> {
    let result: ResPwdInitDto = getDefaultResult;

    try {
      //const { output } = await this.repo
      const dbResult = await this.repo
        .getReq()
        .input('PHONE_NO', reqData.PHONE_NO)
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .execute<DBPwdInitDto>('PROC_SET_M_PWD_INIT');

      result = getDetailResult<DBPwdInitDto>(dbResult);

      if (result.RESULT) {
        const { EMAIL, PWD } = result.DATA;

        // 메일 보내기
        const mailResult = await this.mail.sendPwd(EMAIL, PWD);

        // api 결과로 pwd 를 내보내는 것은 위험하므로 보내지 않음
        result = {
          ...mailResult,
          DATA: {
            EMAIL: this.mail.maskingEmail(EMAIL),
          },
        };
      }
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 이메일 중복 체크  */
  async getEmailCheck(reqData: ReqEmailChcekDto): Promise<ResEmailChcekDto> {
    let result: ResEmailChcekDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .input('EMAIL', reqData.EMAIL)
        .execute<DBEmailChcekDto>('PROC_GET_EMAIL_CHECK');

      result = getDetailResult<DBEmailChcekDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }

  /** 닉네임 중복 체크  */
  async getNickNameCheck(
    reqData: ReqNickNameCheckDto,
  ): Promise<ResNickNameCheckDto> {
    let result: ResNickNameCheckDto = getDefaultResult;

    try {
      const dbResult = await this.repo
        .getReq()
        .output('RET_CODE', VarChar(10))
        .output('RET_MSG', VarChar(500))
        .input('NICK_NAME', reqData.NICK_NAME)
        .execute<DBNickNameCheckDto>('PROC_GET_NICK_NAME_CHECK');

      result = getDetailResult<DBNickNameCheckDto>(dbResult);
    } catch (ex) {
      result = getErrorResult(ex, reqData);
    }

    return result;
  }
}
