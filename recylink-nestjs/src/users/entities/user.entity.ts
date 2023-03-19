import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  @Prop({ required: true })
  fullName: string;
  @Field(() => String)
  @Prop({ required: true, unique: true })
  email: string;
  @Field(() => String)
  @Prop({ required: true })
  password: string;
  @Field(() => Boolean)
  @Prop({ default: true, type: Boolean })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
