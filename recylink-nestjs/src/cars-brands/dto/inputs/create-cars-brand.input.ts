import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCarsBrandInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}
