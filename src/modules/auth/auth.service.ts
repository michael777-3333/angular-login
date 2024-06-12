import { HttpException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userLoginObject: AuthDto) {
    const { email, password } = userLoginObject;
    const findUser = await this._userService.findByEmail(email);
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPass = await compare(password, findUser.password);
    if (!checkPass) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser.id, name: findUser.name };
    const token = this.jwtService.sign(payload);
    const data = {
      user: findUser,
      token: token,
    };
    return data;
  }
}
