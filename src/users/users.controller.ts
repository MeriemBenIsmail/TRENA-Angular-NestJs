import { UsersService } from './users.service';
import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@User() user: UserDetails): UserDetails {
    return user;
  }

  //protect route with jwt token
  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
}
