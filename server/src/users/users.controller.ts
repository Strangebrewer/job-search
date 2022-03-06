import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDataPipe } from './pipes/validate-user-data.pipe';
import { TransformUserDataPipe } from './pipes/transform-user-data.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@User() user: UserEntity) {
    return this.usersService.getCurrentUser(user.id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: Req) {
    const { token } = this.usersService.getToken(req.user);
    return { user: req.user, token };
  }

  @Post('register')
  async register(
    @Body(ValidateUserDataPipe, TransformUserDataPipe) createUserDto: CreateUserDto,
    @Request() req: Req
  ) {
    return await this.usersService.create(createUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidateUserDataPipe, TransformUserDataPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
