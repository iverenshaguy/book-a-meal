import { Body, Controller, Get, HttpCode, Post, Query, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { EmailDto } from './dto/email.dto';
import { PasswordDto } from './dto/password.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthenticatedRequest } from './interfaces/auth.interface';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/api/v2/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {

  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    const { role } = signupDto;

    if (role === 'caterer') {
      return this.authService.createBusiness(signupDto)
    } else {
      return this.authService.createUser(signupDto)
    }
  }

  @Post('signin')
  @HttpCode(200)
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('forgot_password')
  @HttpCode(200)
  forgotPassword(@Body() { email }: EmailDto) {
    return this.authService.triggerForgotPasswordEmail(email);
  }

  @Post('reset_password')
  @HttpCode(200)
  resetPassword(
    @Body() { password }: PasswordDto,
    @Query('email') email: string,
    @Query('token') token: string
  ) {
    return this.authService.resetPassword({
      email, password, token
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh_token')
  @HttpCode(200)
  refreshToken(
    @Request() { user }: AuthenticatedRequest,
  ) {
    return this.authService.refreshToken(user);
  }
}
