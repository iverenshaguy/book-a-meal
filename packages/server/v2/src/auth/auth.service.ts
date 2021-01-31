import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import * as randomString from 'random-string';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';
import Mailer from '../common/utils/Mailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(signupDto: SignupDto) {
    const user = await this.userService.createUser(signupDto);
    const token = this.generateToken(user);

    return { user, token };
  }

  async createBusiness(signupDto: SignupDto) {
    const user = await this.userService.createBusiness(signupDto);
    const token = this.generateToken(user);

    return { user, token };
  }

  async signin(signinDto: SigninDto) {
    const user = await this.userService.validateUserPassword(signinDto);
    const token = this.generateToken(user);

    return { user, token };
  }

  async validateUser(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne({ where: { email } });

    if (user) {
      const { password, ...result } = user.get({ plain: true });

      return result;
    }

    return null;
  }

  async triggerForgotPasswordEmail(email: string): Promise<{ message: string }> {
    const user = await this.userService.findOne({ where: { email } });

    if (user) {
      const token = randomString({ length: 40 });

      await user.update({
        passwordResetToken: token,
        passwordTokenExpiry: Date.now() + 3600000 // 1 hour from now
      });
  
      await Mailer.forgotPasswordMail(token, email);
    }

    return { message: 'A reset token has been sent to your email address' };
  
  }

  async resetPassword({ email, password, token }) {
    const user = await this.userService.findOne({
      where: {
        passwordResetToken: token,
        passwordTokenExpiry: {
          [Op.gt]: Date.now()
        },
      }
    });

    if (!user) throw new BadRequestException('Password reset token is invalid or has expired');

    await user.update({
      password,
      passwordResetToken: null,
      passwordTokenExpiry: null,
    });

    await Mailer.resetPasswordMail(email);

    return { message: 'Password reset successful' };
  }

  async refreshToken(user: User) {
    const userObj = await this.userService.getUserObj({ ...user });
    const token = this.generateToken(userObj);

    return { token };
  }

  generateToken({ id, role, email }: User) {
    const payload: JwtPayload = {
      id,
      role,
      email,
    };

    return this.jwtService.sign(payload);
  }

}
