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
    it('should return null i.e. no error for right email value for signin form', () => {
      const check = syncValidate('signin')('email', rightSigninValues);

      expect(check).toEqual(null);
    });

    it('should return null i.e. no error for right password value for signin form', () => {
      const check = syncValidate('signin')('password', { password: 'emiolaolasanmi' });

      expect(check).toEqual(null);
    });
  });

  describe('Wrong Input', () => {
    it('should return an error for wrong email value for signin form', () => {
      const check = syncValidate('signin')('email', wrongSigninValues);

      expect(check).toEqual('Invalid email address!');
    });

    it('should return an error for wrong password value for signin form', () => {
      const check = syncValidate('signin')('password', { password: '' });

      expect(check).toEqual('Required!');
    });

    it('should return an error for wrong password confirm value for signin form', () => {
      const check = syncValidate('customerSignup')('passwordConfirm', wrongSigninValues);

      expect(check).toEqual('Passwords do not match');
    });

    it('should return an error for empty email value for signin form', () => {
      const check = syncValidate('signin')('email', { email: '' });

      expect(check).toEqual('Required!');
    });

    it('should return null i.e. no error for non-existent field value for signin form', () => {
      const check = syncValidate('signin')('name', { name: '' });

      expect(check).toEqual(null);
    });
  });
});
