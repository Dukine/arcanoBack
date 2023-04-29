import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cart-history')
  @SerializeOptions({ excludeExtraneousValues: true })
  @UseInterceptors(ClassSerializerInterceptor)
  getUserCart() {
    return this.appService.getUserHistory('2');
  }
}
