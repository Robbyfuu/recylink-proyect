import { InputType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateModelsCarInput {
  @Field(() => String)
  @IsNotEmpty()
  nameModel: string;
  @Field(() => ID)
  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string;
}
