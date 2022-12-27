/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './schemas/coach.schema';
import { CoachesService } from './coaches.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @UseGuards(JwtGuard)
  @Get(':coachId')
  async getCoach(@Param('coachId') coachId: string): Promise<Coach> {
    return this.coachesService.getCoachById(coachId);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getCoaches(): Promise<Coach[]> {
    return this.coachesService.getCoaches();
  }

  @UseGuards(JwtGuard)
  @Post()
  async createCoach(
    @User() user,
    @Body() createCoachDTO: CreateCoachDto,
  ): Promise<Coach> {
    return this.coachesService.createCoach(user, createCoachDTO);
  }

  @UseGuards(JwtGuard)
  @Patch(':coachId')
  async updateCoach(
    @User() user,
    @Param('id') id: string,
    @Body() updateCoachDTO: UpdateCoachDto,
  ): Promise<Coach> {
    return this.coachesService.updateCoach(user, id, updateCoachDTO);
  }

  @UseGuards(JwtGuard)
  @Delete(':coachId')
  async deleteCoach(
    @User() user,
    @Param('coachId') coachId: string,
  ): Promise<Coach> {
    return this.coachesService.deleteCoach(user, coachId);
  }
}
