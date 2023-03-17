import { IsEmail, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPsw {
  @IsEmail()
  @Field()
  @IsString()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field()
  confirmPassword: string;
}
