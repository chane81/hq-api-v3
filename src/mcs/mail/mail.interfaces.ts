export interface MailModuleOptions {
  service: string;
  host: string;
  port: number;
  smtpUser: string;
  smtpPwd: string;
  fromEmail: string;
}

export interface EmailVar {
  key: string;
  value: string;
}
