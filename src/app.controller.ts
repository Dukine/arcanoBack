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
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('History')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cart-history')
  //Swagger decorators
  @ApiOkResponse({ description: 'User Found', type: UserHistoryDto })
  @ApiQuery({
    name: 'id',
    required: false,
    description: "User's ID",
  })
  //Serializer decorators
  @SerializeOptions({ excludeExtraneousValues: true })
  @UseInterceptors(ClassSerializerInterceptor)
  getUserCart(@Query('id') id: string | undefined): Promise<UserHistoryDto> {
    return this.appService.getUserHistory(id ? id : '1');
  }
}
