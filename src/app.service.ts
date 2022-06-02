import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(param): string {
    return `Hello World! Your Id : ${param}`;
  }
  getBody({ name }): string {
    return `My name is ${name}`;
  }
}
