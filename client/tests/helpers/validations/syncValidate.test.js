import syncValidate from '../../../src/helpers/validations/syncValidate';

const rightSigninValues = {
  email: 'emiolaolasanmi@gmail.com',
  password: 'emiolaolasanmi',
};

const wrongSigninValues = {
  email: 'Emiola',
  password: 'emil',
  passwordConfirm: 'emiola'
};

describe('Sync Validation: Auth', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Right Input', () => {
    test('email: signin', () => {
      const check = syncValidate('signin')('email', rightSigninValues);

      expect(check).toEqual(null);
    });

    test('password: signin', () => {
      const check = syncValidate('signin')('password', { password: 'emiolaolasanmi' });

      expect(check).toEqual(null);
    });
  });

  describe('Wrong Input', () => {
    test('email: signin', () => {
      const check = syncValidate('signin')('email', wrongSigninValues);

      expect(check).toEqual('Invalid email address!');
    });

    test('password: signin', () => {
      const check = syncValidate('signin')('password', { password: '' });

      expect(check).toEqual('Required!');
    });

    test('passwordConfirm', () => {
      const check = syncValidate('customerSignup')('passwordConfirm', wrongSigninValues);

      expect(check).toEqual('Passwords do not match');
    });

    test('email', () => {
      const check = syncValidate('signin')('email', { email: '' });

      expect(check).toEqual('Required!');
    });

    test('non-existent field', () => {
      const check = syncValidate('signin')('name', { name: '' });

      expect(check).toEqual(null);
    });
  });
});
