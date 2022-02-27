import { Inject, Injectable } from '@nestjs/common';
import { MailModuleOptions } from './mail.interfaces';
import { CONFIG_OPTIONS } from '~/constants/common.constants';
import { EmailVar } from './mail.interfaces';
import * as nodemailer from 'nodemailer';
import { BaseDto } from '~/src/models/dto/base.dto';
import { getErrorResult, getDefaultResult } from '~/utils/result.util';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  /**
   * 메일 보내기
   * @param html 메일 html
   * @param toEmail 받는사람 메일
   * @param subject 제목
   * @param emailVars html 에서 replace 되어야할 값들 설정
   * @returns
   */
  public async sendEmail(
    html: string,
    toEmail: string,
    subject: string,
    emailVars: EmailVar[],
  ): Promise<BaseDto> {
    let result: BaseDto = getDefaultResult;

    try {
      const transporter = nodemailer.createTransport({
        service: this.options.service,
        host: this.options.host,
        port: this.options.port,
        secure: true,
        auth: {
          // smtp user
          user: this.options.smtpUser,
          // smtp pwd
          pass: this.options.smtpPwd,
        },
      });

      emailVars.forEach(({ key, value }) => {
        const matcher = new RegExp('{{' + key + '}}', 'g');
        html = html.replace(matcher, value);
      });

      // send email
      await transporter.sendMail({
        // 보내는 곳 메일 주소
        from: this.options.fromEmail,
        // 받는 곳의 메일 주소
        to: toEmail,
        // 제목
        subject: subject,
        // html
        html,
      });
    } catch (ex) {
      result = getErrorResult(ex, {
        html,
        toEmail,
        subject,
        emailVars,
      });
    }

    return result;
  }

  /**
   * 비밀번호 메일로 보내기
   * @param toEmail 받는사람 메일
   * @param pwd 비밀번호
   */
  async sendPwd(toEmail: string, pwd: string): Promise<BaseDto> {
    let result: BaseDto = getDefaultResult;

    try {
      const html = `
        <div>여기에 물어봐 개인 비밀번호 입니다.</div>
        <div>타인에게 절대 노출이 되지 않도록 유의해 주세요.</div>
        <div style="margin-top: 20px;">
          <span style="height:12px;border:1px solid #5c7cfa;background-color:#5c7cfa;color:white; padding: 8px;text-decoration: none;">비밀번호: {{pwd}}</span>    
        </div>
      `;

      result = await this.sendEmail(html, toEmail, '여기에 물어봐', [
        { key: 'pwd', value: pwd },
      ]);
    } catch (ex) {
      result = getErrorResult(ex, {
        toEmail,
        pwd,
      });
    }

    return result;
  }

  /**
   * 이메일 마스킹 처리
   * @param email 마스킹 처리될 이메일
   */
  maskingEmail(email: string): string {
    const maskedEmail = email.replace(/([^@\.])/g, '*').split('');

    let previous = '';

    for (let i = 0; i < maskedEmail.length; i++) {
      if (i <= 1 || previous == '.' || previous == '@') {
        maskedEmail[i] = email[i];
      }

      previous = email[i];
    }

    return maskedEmail.join('');
  }
}
