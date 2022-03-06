import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './entities/job.entity';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<Job>
  ) { }

  findAll(userId: string, query: Record<string, unknown>) {
    query = { user: userId, ...query };
    return this.jobModel.find(query);
  }

  create(createJobDto: CreateJobDto) {
    return this.jobModel.create(createJobDto);
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true });
  }

  remove(_id: string) {
    return this.jobModel.deleteOne({ _id });
  }
}
