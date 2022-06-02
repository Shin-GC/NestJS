import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail({ message: '올바른 이메일이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수로 입력해주세요!' })
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '이름은 필수로 입력해주세요!' })
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '패스워드는 필수로 입력해주세요!' })
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
