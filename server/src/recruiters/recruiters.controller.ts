import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { RecruitersService } from './recruiters.service';

@Controller('recruiters')
export class RecruitersController {
  constructor(private readonly recruitersService: RecruitersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: UserEntity, @Query() query: Record<string, unknown>) {
    return this.recruitersService.findAll(user.id, query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.recruitersService.create(createRecruiterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, updateRecruiterDto: UpdateRecruiterDto) {
    return this.recruitersService.update(id, updateRecruiterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitersService.remove(id);
  }
}
