import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

interface IException {
  response:
    | {
        statusCode: number;
        message: string | string[];
        error: string;
      }
    | undefined;
  status: number;
  message: string;
}

/** 익셉션 처리 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? (exception as HttpException).getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // sentry에 에러 데이터 전송
    Sentry.captureException(exception, {
      extra: {
        op: '[request error]',
        requestData: request,
      },
    });

    // exception error(with class validation error message)
    const except = exception as IException;
    const exceptionMsg = except?.response
      ? except.response.message
      : except.message;

    response.status(status).json({
      RESULT: false,
      RESULT_CODE: '99',
      STATUS_CODE: status,
      RESULT_MSG: Array.isArray(exceptionMsg) ? exceptionMsg[0] : exceptionMsg,
      TIME_STAMP: new Date().toISOString(),
      PATH: request.url,
    });
  }
}
