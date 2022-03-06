import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  controllers: [JobsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Job.name,
        schema: JobSchema
      }
    ])],
  providers: [JobsService]
})
export class JobsModule { }
