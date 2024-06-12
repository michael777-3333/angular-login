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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private _userService: UsersService) {}
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this._userService.createUser(newUser);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(): Promise<User[]> {
    return this._userService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this._userService.getUser(id);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this._userService.deleteUser(id);
  }
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this._userService.updateUser(id, user);
  }
}
