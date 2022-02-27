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
import { SvcService } from './svc.service';
import { ReqSvcListDto, ResSvcListDto } from '~/dto/admin/svc/list.dto';
import { AuthGuard } from '~/mcs/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ReqServiceInsertDto,
  ReqServiceInsertFileDto,
  ResServiceInsertDto,
} from '~/dto/admin/svc/insert.dto';
import { ISession } from '~/types/sessionType';
import { ReqServiceImageDto, ResServiceImageDto } from '~/dto/admin/svc/image.dto';
import {
  ReqServiceDetailDto,
  ResServiceDetailDto,
} from '~/dto/admin/svc/detail.dto';
import {
  ReqServiceModifyDto,
  ReqServiceModifyFileDto,
  ResServiceModifyDto,
} from '~/dto/admin/svc/modify.dto';

@UseGuards(AuthGuard)
@Controller()
@UseFilters(new AllExceptionsFilter())
export class SvcController {
  constructor(private readonly svcService: SvcService) {}

  /** 서비스 리스트 */
  @Get('getList')
  async getList(@Query() reqData: ReqSvcListDto): Promise<ResSvcListDto> {
    const result = await this.svcService.getList(reqData);

    return result;
  }

  /** 서비스정보 등록 */
  @Post('setInsert')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'IMGS' }]))
  async setInsert(
    @Body() reqData: ReqServiceInsertDto,
    @UploadedFiles() reqFiles: ReqServiceInsertFileDto,
    @Session() session: ISession,
  ): Promise<ResServiceInsertDto> {
    const result = await this.svcService.setInsert(
      reqData,
      reqFiles,
      session.USER_ID,
    );

    return result;
  }

  /** 서비스 수정 */
  @Post('setModify')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'IMGS' }]))
  async setModify(
    @Body() reqData: ReqServiceModifyDto,
    @UploadedFiles() reqFiles: ReqServiceModifyFileDto,
    @Session() session: ISession,
  ): Promise<ResServiceModifyDto> {
    const result = await this.svcService.setModify(
      reqData,
      reqFiles,
      session.USER_ID,
    );

    return result;
  }

  /** 서비스 상세 */
  @Get('getDetail')
  async getDetail(
    @Query() reqData: ReqServiceDetailDto,
  ): Promise<ResServiceDetailDto> {
    const result = await this.svcService.getDetail(reqData);

    return result;
  }

  /** 서비스 이미지리스트 */
  @Get('getImageList')
  async getImageList(
    @Query() reqData: ReqServiceImageDto,
  ): Promise<ResServiceImageDto> {
    const result = await this.svcService.getImageList(reqData);

    return result;
  }
}
