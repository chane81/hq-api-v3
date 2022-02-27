import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { BoardService } from './board.service';
import {
  ReqNotiDetailDto,
  ResNotiDetailDto,
  ResNotiListDto,
} from '~/dto/mobile/board/noti.dto';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /** 공지 리스트 */
  @Get('getNotiList')
  async getNotiList(): Promise<ResNotiListDto> {
    const result = await this.boardService.getNotiList();

    return result;
  }

  /** 공지 상세 */
  @Get('getNotiDetail')
  async getNotiDetail(
    @Query() reqData: ReqNotiDetailDto,
  ): Promise<ResNotiDetailDto> {
    const result = await this.boardService.getNotiDetail(reqData);

    return result;
  }
}
