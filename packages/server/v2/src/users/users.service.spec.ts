import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { userDto, businessDto, createBusinessDto, createUserDto } from '../../tests/utils/mockData';
import { User } from './user.model';

describe('Users Service', () => {
  let usersService: UsersService;
  let userModel: typeof User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: {
            findOrCreate: jest.fn()
              .mockResolvedValue([{ ...createUserDto, get: () => createUserDto }, true])
              .mockResolvedValueOnce([{ ...createUserDto, get: () => createUserDto }, true])
              .mockResolvedValueOnce([{ ...createBusinessDto, get: () => createBusinessDto }, true])
              .mockResolvedValueOnce([{ ...createUserDto, get: () => createUserDto }, false]),
            findOne: jest.fn()
              .mockResolvedValue(null)
              .mockResolvedValueOnce(null)
              .mockResolvedValueOnce(createBusinessDto)
              .mockResolvedValueOnce({ ...createUserDto, get: () => createUserDto, validatePassword: () => true })
              .mockResolvedValueOnce({ ...createUserDto, get: () => createUserDto, validatePassword: () => false }),
            validatePassword: jest.fn()
            .mockResolvedValue(true)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(false),
          },
        }
      ]
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<typeof User>('UserRepository');
  });

  it('should create a user', async () => {
    const findOrCreateSpy = jest.spyOn(userModel, 'findOrCreate');

    const result = await usersService.createUser(createUserDto);

    expect(findOrCreateSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ ...userDto, id: result.id });
  });

  it('should create a business', async () => {
    const findOneSpy = jest.spyOn(userModel, 'findOne');
    const findOrCreateSpy = jest.spyOn(userModel, 'findOrCreate');

    const result = await usersService.createBusiness(createBusinessDto);

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOrCreateSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ ...businessDto, id: result.id });
  });

  it('should not recreate a user that already exists', async () => {
    const findOrCreateSpy = jest.spyOn(userModel, 'findOrCreate');

    try {
      await usersService.createUser(createUserDto);
    } catch(error) {

      expect(error.message).toEqual('Conflict Exception');
      expect(error.response).toHaveProperty('error');
      expect(error.response.error).toEqual('Email already in use');
      expect(findOrCreateSpy).toHaveBeenCalledTimes(3);
    }
  });

  it('should not recreate a business that already exists', async () => {
    const findOneSpy = jest.spyOn(userModel, 'findOne');

    try {
      await usersService.createBusiness(createBusinessDto);
    } catch(error) {
      expect(error.message).toEqual('Conflict Exception');
      expect(error.response).toHaveProperty('error');
      expect(error.response.error).toEqual('Business name already in use');
      expect(findOneSpy).toHaveBeenCalledTimes(2);
    }
  });

  it('should validate a valid password', async () => {
    const result = await usersService.validateUserPassword({ email: userDto.email, password: createUserDto.password });

    expect(result).toEqual({ ...userDto, id: result.id });
  });

  it('should not validate an ivalid password', async () => {
    try {
      await usersService.validateUserPassword({ email: userDto.email, password: createUserDto.password });
    } catch(error) {
      expect(error.message).toEqual('Unauthorized Exception');
      expect(error.response).toHaveProperty('error');
      expect(error.response.error).toEqual('Invalid credentials');
    }
  });
});
