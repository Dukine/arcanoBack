import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cart-history')
  getUserCart(): string {
    return this.appService.getUserCart();
  }
}
