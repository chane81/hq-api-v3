import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { CompanyService } from './company.service';
import {
  ReqCompanyListDto,
  ResCompanyListDto,
} from '~/dto/admin/company/list.dto';
import { AuthGuard } from '~/mcs/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ReqCompanyInsertDto,
  ReqCompanyInsertFileDto,
  ResCompanyInsertDto,
} from '~/dto/admin/company/insert.dto';
import { ISession } from '~/types/sessionType';
import {
  ReqCompanyDetailDto,
  ResCompanyDetailDto,
} from '~/dto/admin/company/detail.dto';
import {
  ReqCompanyImageDto,
  ResCompanyImageDto,
} from '~/dto/admin/company/image.dto';
import {
  ReqCompanyModifyDto,
  ReqCompanyModifyFileDto,
  ResCompanyModifyDto,
} from '~/dto/admin/company/modify.dto';
import { ResCompanySimpleListDto } from '~/dto/admin/company/simpleList.dto';

@UseGuards(AuthGuard)
@Controller()
@UseFilters(new AllExceptionsFilter())
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /** 기업 리스트 */
  @Get('getList')
  async getList(@Query() reqData: ReqCompanyListDto): Promise<ResCompanyListDto> {
    const result = await this.companyService.getList(reqData);

    return result;
  }

  /** 기업 간단 리스트 - id, name 만 제공 */
  @Get('getSimpleList')
  async getSimpleList(): Promise<ResCompanySimpleListDto> {
    const result = await this.companyService.getSimpleList();

    return result;
  }

  /** 기업정보 등록 */
  @Post('setInsert')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'IMGS' }]))
  async setInsert(
    @Body() reqData: ReqCompanyInsertDto,
    @UploadedFiles() reqFiles: ReqCompanyInsertFileDto,
    @Session() session: ISession,
  ): Promise<ResCompanyInsertDto> {
    const result = await this.companyService.setInsert(
      reqData,
      reqFiles,
      session.USER_ID,
    );

    return result;
  }

  /** 기업정보 수정 */
  @Post('setModify')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'IMGS' }]))
  async setModify(
    @Body() reqData: ReqCompanyModifyDto,
    @UploadedFiles() reqFiles: ReqCompanyModifyFileDto,
    @Session() session: ISession,
  ): Promise<ResCompanyModifyDto> {
    const result = await this.companyService.setModify(
      reqData,
      reqFiles,
      session.USER_ID,
    );

    return result;
  }

  /** 기업 상세 */
  @Get('getDetail')
  async getDetail(
    @Query() reqData: ReqCompanyDetailDto,
  ): Promise<ResCompanyDetailDto> {
    const result = await this.companyService.getDetail(reqData);

    return result;
  }

  /** 기업 이미지리스트 */
  @Get('getImageList')
  async getImageList(
    @Query() reqData: ReqCompanyImageDto,
  ): Promise<ResCompanyImageDto> {
    const result = await this.companyService.getImageList(reqData);

    return result;
  }
}
