import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (userFound) {
      return new HttpException('User alredy exists', HttpStatus.CONFLICT);
    }
    const { password } = user;
    const hasPassword = await hash(password, 10);
    user = { ...user, password: hasPassword };
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Credenciales incorrectas o usuario inactivo. Por favor comunicarse con el administrador',
      );
    }
    return user;
  }
}
