import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  loginUser(@Body() userLoginObject: AuthDto) {
    console.log(userLoginObject);
    return this._authService.login(userLoginObject);
  }
}
