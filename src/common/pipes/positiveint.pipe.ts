import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value >= 0) return value;
    else throw new HttpException('id는 양수만 입력 가능합니다.', 400);
  }
}
