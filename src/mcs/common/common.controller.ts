import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { CommonService } from './common.service';
import { ReqCodeListDto, ResCodeListDto } from '~/dto/common/codeList.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  /** 코드리스트 */
  @Get('codeList')
  async codeList(@Query() reqData: ReqCodeListDto): Promise<ResCodeListDto> {
    const result = await this.commonService.getCodeList(reqData);

    return result;
  }
}
