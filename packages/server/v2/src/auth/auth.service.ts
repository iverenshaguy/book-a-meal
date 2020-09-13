import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';

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
    const user = await this.userService.findOne({ email });

    if (user) {
      const { password, ...result } = user;
      // @ts-ignore
      return result;
    }

    return null;
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
