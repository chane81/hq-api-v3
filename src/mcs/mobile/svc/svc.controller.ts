import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { SvcService } from './svc.service';
import { ReqSvcImageDto, ResSvcImageDto } from '~/dto/mobile/svc/image.dto';
import { ReqSvcListDto, ResSvcListDto } from '~/dto/mobile/svc/list.dto';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class SvcController {
  constructor(private readonly svcService: SvcService) {}

  /** 서비스에 해당하는 이미지 리스트 */
  @Get('getImageList')
  async getImageList(@Query() reqData: ReqSvcImageDto): Promise<ResSvcImageDto> {
    const result = await this.svcService.getImageList(reqData);

    return result;
  }

  /** 기업에 해당하는 서비스 리스트 */
  @Get('getSvcList')
  async getSvcList(@Query() reqData: ReqSvcListDto): Promise<ResSvcListDto> {
    const result = await this.svcService.getSvcList(reqData);

    return result;
  }
}
