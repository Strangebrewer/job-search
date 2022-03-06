import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
  @IsOptional()
  @IsDate()
  date_applied: Date;

  @IsOptional()
  @IsDate({ each: true })
  interview_dates: Date[];

  @IsOptional()
  @IsString()
  readonly point_of_contact: string;

  @IsOptional()
  @IsString()
  readonly poc_title: string;

  @IsString()
  readonly company_name: string;

  @IsOptional()
  @IsString()
  readonly company_address: string;

  @IsOptional()
  @IsString()
  readonly company_city: string;

  @IsOptional()
  @IsString()
  company_state: string;

  @IsString()
  job_title: string;

  @IsOptional()
  @IsString()
  recruiter: string;

  @IsString()
  readonly work_from: string;

  @IsString()
  readonly status: string;

  @IsOptional()
  @IsString()
  readonly declined: string;

  @IsOptional()
  @IsString({ each: true })
  comments: string[];
  
  @IsString()
  user: string;
}
