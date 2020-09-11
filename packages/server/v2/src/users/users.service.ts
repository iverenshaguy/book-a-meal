import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { sign } from 'crypto';
import { Op } from 'sequelize';

import { SignupDto } from '../auth/dto/signup.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(signupDto: SignupDto): Promise<User> {
    const {
      role,
      businessName,
      firstname,
      lastname,
      password,
      phoneNo,
      address,
      email,
    } = signupDto;

    const [newUser, created] = await this.userModel.findOrCreate({
      where: { email: { [Op.iLike]: email } },
      defaults: {
        firstname,
        lastname,
        businessName,
        email: email.toLowerCase(),
        password,
        phoneNo,
        address,
        role
      }
    })

    if (!created) throw new ConflictException('Email already in use');

    const user = this.getUserObj({ ...newUser.get() });

    return user;
  }

  async createBusiness(signupDto: SignupDto): Promise<User> {
    const {
      role,
      businessName,
    } = signupDto;

    const existingBusiness = await this.userModel.findOne({
      where: { businessName: { [Op.iLike]: businessName } }
    });

    if (existingBusiness) throw new ConflictException('Business name already in use');

    return this.createUser(signupDto);
  }


  /**
   * @method getUserObj
   * @memberof UserCService
   * @param {object} user
   * @return {object} User Object
   */
  getUserObj(user): Promise<User> {
    let userObj;
    const {
      firstname,
      userId,
      lastname,
      address,
      phoneNo,
      email,
      role,
      businessName,
    } = user;

    if (role === 'customer' || role === 'admin') {
      userObj = {
        id: userId,
        firstname,
        lastname,
        address,
        phoneNo,
        email,
        role
      };
    }

    if (role === 'caterer') {
      userObj = {
        id: userId,
        businessName,
        address,
        phoneNo,
        email,
        role
      };
    }

    return userObj;
  }

  findOne({ email }): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async validateUserPassword(signinDto): Promise<User> {
    const user = await this.findOne(signinDto);
    console.log(await user.validatePassword(signinDto.password), user)
    const isValidPassword = user && await user.validatePassword(signinDto.password)

    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    return this.getUserObj({ ...user.get() });
  }
}
