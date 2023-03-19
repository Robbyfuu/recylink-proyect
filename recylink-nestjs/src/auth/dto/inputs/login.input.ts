import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  email: string;
  @Field(() => String)
  @MinLength(6)
  password: string;
}
