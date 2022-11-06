import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Recruiter } from "src/recruiters/entity/recruiter.entity";
import { User } from "src/users/entities/user.entity";

type Interview = {
  number: string;
  date: Date;
  interviewers: string[];
};

type Comment = {
  comment: string,
  date: Date
};

@Schema({ timestamps: true })
export class Job extends Document {
  @Prop()
  date_applied: Date;

  @Prop()
  interviews: Interview[];

  @Prop()
  point_of_contact: string;

  @Prop()
  poc_title: string;

  @Prop({ required: true })
  company_name: string;

  @Prop()
  company_address: string;

  @Prop()
  company_city: string;

  @Prop()
  company_state: string;

  @Prop({ required: true, default: false })
  archived: boolean;

  @Prop({ required: true })
  job_title: string;

  @Prop({ ref: Recruiter.name })
  recruiter: string;

  @Prop({
    required: true,
    enums: ['on-site', 'hybrid', 'remote'],
    default: 'remote'
  })
  work_from: string;

  @Prop({
    required: true,
    enums: ['new', 'applied', 'interview', 'awaiting', 'needs attention', 'offer', 'declined'],
    default: 'new'
  })
  status: string;

  @Prop({ enums: ['i', 'they', 'ghosted', 'n/a'] })
  declined: string;

  @Prop()
  comments: Comment[];

  @Prop({ ref: User.name, required: true })
  user: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
