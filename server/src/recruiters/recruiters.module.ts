import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recruiter, RecruiterSchema } from './entity/recruiter.entity';
import { RecruitersController } from './recruiters.controller';
import { RecruitersService } from './recruiters.service';

@Module({
  controllers: [RecruitersController],
  imports: [MongooseModule.forFeature([
    {
      name: Recruiter.name,
      schema: RecruiterSchema
    }
  ])],
  providers: [RecruitersService]
})
export class RecruitersModule { }
