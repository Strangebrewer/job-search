import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recruiter } from './entity/recruiter.entity';
import { Model } from 'mongoose';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Injectable()
export class RecruitersService {
  constructor(
    @InjectModel(Recruiter.name) private readonly recruiterModel: Model<Recruiter>
  ) { }

  findAll(userId: string, query: Record<string, unknown>) {
    query = { user: userId, ...query };
    console.log('query:::', query);
    return this.recruiterModel.find(query)
  }

  create(createRecruiterDto: CreateRecruiterDto) {
    console.log('createRecruiterDto:::', createRecruiterDto);
    return this.recruiterModel.create(createRecruiterDto);
  }

  update(id: string, updateRecruiterDto: UpdateRecruiterDto) {
    return this.recruiterModel.findByIdAndUpdate(id, updateRecruiterDto, { new: true });
  }

  remove(_id: string) {
    return this.recruiterModel.deleteOne({ _id });
  }
}
