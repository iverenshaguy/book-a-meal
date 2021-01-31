import { User } from './user.model';
import { createUserDto, createBusinessDto } from '../../tests/utils/mockData';
// @ts-ignore
import { mockSequelize } from '../../tests/utils/setup';

describe('User class', () => {
  let user = mockSequelize.getRepository(User);
  let hashedPassword, userId;

  it('should not create a user without email and password', async () => {
    try {
      await user.create();
    } catch(error) {
      expect(error.errors[0].message).toEqual('User.email cannot be null');
      expect(error.errors[1].message).toEqual('User.password cannot be null');
    }
  });

  it('should create a business', async () => {
    const createdBusiness = await user.create(createBusinessDto);

    expect(createdBusiness).toHaveProperty('userId')
    expect(createdBusiness).toHaveProperty('createdAt')
    expect(createdBusiness).toHaveProperty('updatedAt')
    expect(createdBusiness.password).not.toEqual(createUserDto.password)
  });

  it('should hash the user\'s password before creation', async () => {
    const createdUser = await user.create(createUserDto);

    hashedPassword = createdUser.password;
    userId = createdUser.userId;

    expect(createdUser).toHaveProperty('userId')
    expect(createdUser).toHaveProperty('createdAt')
    expect(createdUser).toHaveProperty('updatedAt')
    expect(createdUser.password).not.toEqual(createUserDto.password)
  });

  it('should validate a user\'s password', async () => {
    const createdUser = await user.findOne({ where: { userId } });
    const isPasswordValid = await createdUser.validatePassword(createUserDto.password);

    expect(isPasswordValid).toEqual(true)
  });
});
