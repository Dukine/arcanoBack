import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Query,
} from '@nestjs/common';

import { AppService } from './app.service';
import { UserHistoryDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cart-history')
  @SerializeOptions({ excludeExtraneousValues: true })
  @UseInterceptors(ClassSerializerInterceptor)
  getUserCart(@Query('id') id: string): Promise<UserHistoryDto> {
    return this.appService.getUserHistory(id ? id : '1');
  }
}
