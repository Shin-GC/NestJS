import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // GET 요청 @Param을 사용하여 request.params 값을 받아온다.
  @Get('')
  getHello(@Param('id') id: { id: string }): string {
    return this.appService.getHello(id);
  }
  // POST 요청 @Body를 사용하여 request.body 안의 값을 받아온다.
  @Post('/body')
  getBody(@Body() user: { name: string }): string {
    return this.appService.getBody(user);
  }
}
