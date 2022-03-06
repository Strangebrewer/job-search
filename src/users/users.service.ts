import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import slugify from 'slugify';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface ITokenized {
  user: Partial<User>,
  token: string
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) { }

  // for dev convenience - remove later
  findAll() {
    return this.userModel.find();
  }
  deleteAll() {
    return this.userModel.deleteMany();
  }
  // end: for dev convenience - remove later

  async validateUser(username: string, givenPassword: string) {
    const user = await this.findByUsername(username);
    if (user && this.checkPassword(givenPassword, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async getCurrentUser(userId: string): Promise<ITokenized | undefined> {
    const user = await this.userModel.findById(userId);
    if (user) {
      return this.tokenize(user);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ normalizedEmail: email.toLowerCase() });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const trimmed = slugify(username, ' ').trim();
    const slugged = slugify(trimmed, { lower: true });
    return this.userModel.findOne({ normalizedUsername: slugged }).lean();
  }

  async create(createUserDto: CreateUserDto): Promise<ITokenized> {
    let user = new this.userModel(createUserDto);
    user = await user.save();
    return this.tokenize(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(_id: string): Promise<{ deletedCount: number }> {
    return await this.userModel.deleteOne({ _id });
  }

  getCount() {
    return this.userModel.count();
  }

  getToken(user: Partial<User>) {
    const payload = { username: user.username, sub: user._id };
    return { token: this.jwtService.sign(payload) };
  }

  checkPassword(given: string, original: string): boolean {
    return bcrypt.compareSync(given, original);
  }

  hashPassword(plainTextPassword: string): string {
    return bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(10));
  }

  private tokenize(user: Partial<User>): ITokenized {
    const { password, ...rest } = user.toObject();
    const { token } = this.getToken(user);
    return { user: rest, token };
  }
}
