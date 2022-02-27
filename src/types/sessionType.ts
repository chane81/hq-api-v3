import { Session } from 'express-session';
import { DBLoginDto } from '~/dto/admin/auth/login.dbo';

export interface ISession extends Session, Partial<DBLoginDto> {}
