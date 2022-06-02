import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }), // env 파일을 읽기 위한 설정 isGlobal을 통해 다른곳에서 env 파일을 읽을 수 있게 하고 cache 설정을 통해 한번 읽은 env 파일을 캐시에 저장해서 속도 향상
    MongooseModule.forRoot(process.env.MONGODB_URL), // MongoDB connect
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE == 'dev' ? true : false; // env 파일을 통해 현재 모드 판단
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev); // 현재 상태에 따라 mongodb 의 로그 남기기
  }
}
