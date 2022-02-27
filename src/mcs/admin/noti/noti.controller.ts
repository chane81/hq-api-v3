import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { AuthGuard } from '~/mcs/auth/auth.guard';
import { NotiService } from './noti.service';
import { ReqNotiListDto, ResNotiListDto } from '~/dto/admin/noti/list.dto';
import { ReqNotiDetailDto, ResNotiDetailDto } from '~/dto/admin/noti/detail.dto';
import { ReqNotiInsertDto, ResNotiInsertDto } from '~/dto/admin/noti/insert.dto';
import { ISession } from '~/types/sessionType';
import { ReqNotiModifyDto, ResNotiModifyDto } from '~/dto/admin/noti/modify.dto';

@UseGuards(AuthGuard)
@Controller()
@UseFilters(new AllExceptionsFilter())
export class NotiController {
  constructor(private readonly notiService: NotiService) {}

  /** 공지 리스트 */
  @Get('getList')
  async getList(@Query() reqData: ReqNotiListDto): Promise<ResNotiListDto> {
    const result = await this.notiService.getList(reqData);

    return result;
  }

  /** 공지 상세 */
  @Get('getDetail')
  async getDetail(@Query() reqData: ReqNotiDetailDto): Promise<ResNotiDetailDto> {
    const result = await this.notiService.getDetail(reqData);

    return result;
  }

  /** 공지 등록 */
  @Post('setInsert')
  async setInsert(
    @Body() reqData: ReqNotiInsertDto,
    @Session() session: ISession,
  ): Promise<ResNotiInsertDto> {
    const result = await this.notiService.setInsert(reqData, session.USER_ID);

    return result;
  }

  /** 공지 수정 */
  @Post('setModify')
  async setModify(
    @Body() reqData: ReqNotiModifyDto,
    @Session() session: ISession,
  ): Promise<ResNotiModifyDto> {
    const result = await this.notiService.setModify(reqData, session.USER_ID);

    return result;
  }
}
