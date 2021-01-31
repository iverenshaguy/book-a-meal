import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET
    });
  }

  async validate({ email }: JwtPayload): Promise<Omit<User, 'password'>> {
    if (!email){
      throw new UnauthorizedException
    }

    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
