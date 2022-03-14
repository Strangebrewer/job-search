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
    let { hideDeclined, ...rest } = query;
    query = { user: userId, ...rest };
    if (hideDeclined === 'true') {
      query.declined = { $nin: ['i', 'they', 'ghosted'] };
    }
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
