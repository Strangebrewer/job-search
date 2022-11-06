import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRecruiterDto  {
  @IsString()
  readonly name: string;
  
  @IsOptional()
  @IsString()
  readonly company: string;
  
  @IsOptional()
  @IsString()
  phone: string;
  
  @IsOptional()
  @IsString()
  readonly email: string;
  
  @IsOptional()
  @IsString()
  normalized_email: string;
  
  @IsNumber()
  readonly rating: number;
  
  @IsOptional()
  @IsString({ each: true })
  comments: string[];

  @IsOptional()
  @IsBoolean()
  archived: boolean;
  
  @IsString()
  user: string;
}
