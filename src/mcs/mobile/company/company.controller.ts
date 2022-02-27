import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { CompanyService } from './company.service';
import {
  ReqCompanyListDto,
  ResCompanyListDto,
} from '~/dto/mobile/company/list.dto';
import {
  ReqCompanyImageDto,
  ResCompanyImageDto,
} from '~/dto/mobile/company/image.dto';
import {
  ReqCompanyIntroDto,
  ResCompanyIntroDto,
} from '~/dto/mobile/company/intro.dto';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /** 기업 리스트 */
  @Get('getCompanyList')
  async getCompanyList(
    @Query() reqData: ReqCompanyListDto,
  ): Promise<ResCompanyListDto> {
    const result = await this.companyService.getCompanyList(reqData);

    return result;
  }

  /** 기업 이미지 리스트 */
  @Get('getImageList')
  async getImageList(
    @Query() reqData: ReqCompanyImageDto,
  ): Promise<ResCompanyImageDto> {
    const result = await this.companyService.getImageList(reqData);

    return result;
  }

  /** 기업 소개 */
  @Get('getIntro')
  async getIntro(
    @Query() reqData: ReqCompanyIntroDto,
  ): Promise<ResCompanyIntroDto> {
    const result = await this.companyService.getIntro(reqData);

    return result;
  }
}
