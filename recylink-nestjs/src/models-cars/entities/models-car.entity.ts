import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { CarsBrand } from '../../cars-brands/entities/cars-brand.entity';

@ObjectType()
@Schema()
export class ModelsCar extends Document {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  @Prop()
  nameModel: string;
  @Field(() => CarsBrand)
  @Prop({ type: Types.ObjectId, ref: CarsBrand.name, required: true })
  brand: CarsBrand | Types.ObjectId;
}

export const ModelsCarSchema = SchemaFactory.createForClass(ModelsCar);
