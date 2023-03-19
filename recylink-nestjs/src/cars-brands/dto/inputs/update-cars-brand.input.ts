import { CreateCarsBrandInput } from './create-cars-brand.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCarsBrandInput extends PartialType(CreateCarsBrandInput) {
  @Field(() => ID)
  @IsNotEmpty()
  _id: string;
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}
