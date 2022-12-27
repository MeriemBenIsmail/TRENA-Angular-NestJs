/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { CreateCoachDto } from './dto/create-coach.dto';
import { Coach } from './schemas/coach.schema';
import { CoachRepository } from './coach.repository';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/schemas/users.schema';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class CoachesService {
  constructor(private readonly coachRepository: CoachRepository) {}

  async getCoachById(coachId: string): Promise<Coach> {
    return this.coachRepository.findOne({ id: coachId });
  }

  async getCoaches(): Promise<Coach[]> {
    return this.coachRepository.find({});
  }

  async createCoach(
    user: User,
    createCoachDto: CreateCoachDto,
  ): Promise<Coach | any> {
    if (user?.role === UserRoleEnum.ADMIN)
      return this.coachRepository.create({
        id: uuidv4(),
        ...createCoachDto,
      });
    return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async updateCoach(
    user: User,
    coachId: string,
    coachUpdates: UpdateCoachDto,
  ): Promise<Coach | any> {
    if (user?.role === UserRoleEnum.ADMIN)
      return this.coachRepository.findOneAndUpdate({ coachId }, coachUpdates);
    return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  async deleteCoach(user: User, coachId: string): Promise<Coach | any> {
    if (user?.role === UserRoleEnum.ADMIN)
      return this.coachRepository.findOneAndDelete({ coachId });
    return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  async count(options) {
    return this.coachRepository.count(options);
  }
}
