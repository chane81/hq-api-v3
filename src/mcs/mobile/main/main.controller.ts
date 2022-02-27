import { Controller, Get, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '~/utils/exception.filter.util';
import { MainService } from './main.service';
import { ResMainImageDto } from '~/dto/mobile/main/image.dto';
import { ResMainCategDto } from '~/dto/mobile/main/categ.dto';

@Controller()
@UseFilters(new AllExceptionsFilter())
export class MainController {
  constructor(private readonly mainService: MainService) {}

  /** 메인 이미지 리스트 */
  @Get('getImageList')
  async getImageList(): Promise<ResMainImageDto> {
    const result = await this.mainService.getImageList();

    return result;
  }

  /** 메인 카테고리 */
  @Get('getCategList')
  async getCategList(): Promise<ResMainCategDto> {
    const result = await this.mainService.getCategList();

    return result;
  }
}
