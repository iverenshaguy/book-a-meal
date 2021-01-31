import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('/api/v2/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {

  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    const { role } = signupDto;

    if (role === 'caterer') {
      return this.authService.createBusiness(signupDto)
    } else {
      return this.authService.createUser(signupDto)
    }
  }

  @Post('/signin')
  @HttpCode(200)
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
