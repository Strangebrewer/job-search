import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { User } from "src/users/entities/user.entity";

@Schema({ timestamps: true })
export class Recruiter extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  phone: string;
  
  @Prop()
  email: string;

  @Prop()
  normalized_email: string;

  @Prop({ required: true, enum: [0,1,2,3,4,5], default: 3 })
  rating: number;

  @Prop()
  comments: string[];
  
  @Prop({ required: true, ref: User.name })
  user: string
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);
