import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ISession } from '~/types/sessionType';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const sess: ISession = request.session;

    if (sess.USER_ID) return true;

    return false;
  }
}
