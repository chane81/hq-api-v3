import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('healthCheck')
export class AppController {
  /** aws health check 용 */
  @Get()
  @HttpCode(200)
  healthCheck(): string {
    return '200';
  }
}
