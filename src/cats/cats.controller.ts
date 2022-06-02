import { CatRequestDto } from './dto/cats.request.dto';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { PositiveIntPipe } from './../common/pipes/positiveint.pipe';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async SignUp(@Body() body: CatRequestDto) {
    return this.catService.signUp(body);
  }
}
