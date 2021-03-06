import { IsEmail } from 'class-validator';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다'); //403 에러를 반환하는 함수
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }
  async getCat(email: string) {
    const cat = await this.catModel.findOne({ email: Object.values(email) });
    if (!cat) {
      throw new HttpException('해당하는 고양이는 존재하지 않습니다.', 204);
    }
    return cat.readOnlyData;
  }
}
