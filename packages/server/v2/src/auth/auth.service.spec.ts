import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { userDto, businessDto, createBusinessDto, createUserDto } from '../../tests/utils/mockData';
import { UnauthorizedException } from '@nestjs/common';

describe('Auth Service', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthService],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userDto),
            createBusiness: jest.fn().mockResolvedValue(businessDto),
            getUserObj: jest.fn().mockResolvedValue(businessDto),
            findOne: jest.fn().mockImplementation(({ where : { email } }) => {
              if (email === userDto.email) return Promise.resolve({ ...userDto, get() { return userDto }});

              return Promise.resolve(null);
            }),
            validateUserPassword: jest.fn().mockImplementation(({ password }) => {
              if (password === createUserDto.password) return userDto;

              throw new UnauthorizedException({ error: 'Invalid credentials' });
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: ({ id, email }) => `Bearer ${jwt.sign({
              id,
              email,
              role: 'customer',
            }, 'secret', { expiresIn: '24 hour' })}`,
          }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should create a business', async () => {
    const createBusinessSpy = jest.spyOn(authService, 'createBusiness');
    const generateTokenSpy = jest.spyOn(authService, 'generateToken');

    const result = await authService.createBusiness(createBusinessDto);

    expect(createBusinessSpy).toHaveBeenCalledTimes(1);
    expect(generateTokenSpy).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
    expect(result.user).toEqual(businessDto);
  });

  it('should create a user', async () => {
    const createUserSpy = jest.spyOn(authService, 'createUser');
    const generateTokenSpy = jest.spyOn(authService, 'generateToken');

    const result = await authService.createUser(createUserDto);

    expect(createUserSpy).toHaveBeenCalledTimes(1);
    expect(generateTokenSpy).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
    expect(result.user).toEqual(userDto);
  });

  it('should signin a user with a valid password', async () => {
    const validateUserPasswordSpy = jest.spyOn(userService, 'validateUserPassword');
    const generateTokenSpy = jest.spyOn(authService, 'generateToken');

    const result = await authService.signin({ email: userDto.email, password: createUserDto.password });

    expect(validateUserPasswordSpy).toHaveBeenCalledTimes(1);
    expect(generateTokenSpy).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
    expect(result.user).toEqual(userDto);
  });

  it('should not signin a user with an invalid password', async () => {
    const validateUserPasswordSpy = jest.spyOn(userService, 'validateUserPassword');
    const generateTokenSpy = jest.spyOn(authService, 'generateToken');

    try {
      await authService.signin({ email: userDto.email, password: 'createUser.password' });
    } catch(error) {
      expect(validateUserPasswordSpy).toHaveBeenCalledTimes(1);
      expect(generateTokenSpy).not.toHaveBeenCalledTimes(1);

      expect(error.message).toEqual('Unauthorized Exception');
      expect(error.response).toHaveProperty('error');
      expect(error.response.error).toEqual('Invalid credentials');
    }
  });

  it('should validate an existing user', async () => {
    const findOneSpy = jest.spyOn(userService, 'findOne');

    const result = await authService.validateUser(userDto.email);

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userDto);
  });

  it('should not validate an unexisting user', async () => {
    const findOneSpy = jest.spyOn(userService, 'findOne');

    const result = await authService.validateUser('unexisting@user.com');

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(null);
  });
});
