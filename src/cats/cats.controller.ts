import { CatRequestDto } from './dto/cats.request.dto';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { PositiveIntPipe } from './../common/pipes/positiveint.pipe';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Get()
  async getCurrentCat(@Query() email: string) {
    return await this.catService.getCat(email);
  }

  @Post()
  async SignUp(@Body() body: CatRequestDto) {
    return await this.catService.signUp(body);
  }
}
