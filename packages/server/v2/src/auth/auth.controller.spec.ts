import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// @ts-ignore
import { userDto, businessDto, createBusinessDto, createUserDto } from '../../tests/utils/mockData';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userDto),
            createBusiness: jest.fn().mockResolvedValue(businessDto),
            signin: jest.fn().mockResolvedValue(userDto),
            validateUser: jest.fn().mockResolvedValue({}),
            generateToken: jest.fn().mockResolvedValue({}),
          },
        },
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should create a business when role is supplied as caterer', async () => {
      const createBusinessSpy = jest.spyOn(authService, 'createBusiness');

      const result = await authController.signup(createBusinessDto);

      expect(createBusinessSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(businessDto);
    });

    it('should create a user when role is supplied as customer', async () => {
      const createUserSpy = jest.spyOn(authService, 'createUser');

      const result = await authController.signup(createUserDto);

      expect(createUserSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userDto);
    });
  });

  describe('signin', () => {
    it('should signin a user', async () => {
      const signinSpy = jest.spyOn(authService, 'signin');

      const result = await authController.signin({ email: userDto.email, password: createUserDto.password });

      expect(signinSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userDto);
    });
  });
});
