import {
  isRequired,
  maxLength,
  minLength,
  isNumber,
  minValue,
  isValidEmail,
  isName,
  isBusinessName,
  isAddress,
  isPhoneNumber,
  isValidPasswordConfirm,
} from '../../../src/helpers/validations/types';

describe('Validation Types', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Right Input', () => {
    test('isRequired', () => {
      const check = isRequired('Emiola');

      expect(check).toEqual(undefined);
    });

    test('maxLength', () => {
      const check = maxLength(10)('Emiolasand');

      expect(check).toEqual(undefined);
    });

    test('minLength', () => {
      const check = minLength(3)('Emiola');

      expect(check).toEqual(undefined);
    });

    test('isNumber', () => {
      const check = isNumber(67);

      expect(check).toEqual(undefined);
    });

    test('minValue', () => {
      const check = minValue(200)(220);

      expect(check).toEqual(undefined);
    });

    test('isEmail', () => {
      const check = isValidEmail('emiolaolasanmi@gmail.com');

      expect(check).toEqual(undefined);
    });

    test('isName', () => {
      const check = isName('Emiola');

      expect(check).toEqual(undefined);
    });

    test('isBusinessName', () => {
      const check = isBusinessName('2 Business Name');

      expect(check).toEqual(undefined);
    });

    test('isAddress', () => {
      const check = isAddress('3, Macaulay');

      expect(check).toEqual(undefined);
    });

    test('isPhoneNumber', () => {
      const check = isPhoneNumber(1234567890);

      expect(check).toEqual(undefined);
    });

    test('isValidPasswordConfirm', () => {
      const check = isValidPasswordConfirm('emiolaolasanmi', { password: 'emiolaolasanmi' });

      expect(check).toEqual(undefined);
    });
  });

  describe('Wrong Input', () => {
    test('isRequired', () => {
      const check = isRequired('');

      expect(check).toEqual('Required!');
    });

    test('maxLength', () => {
      const check = maxLength(10)('emiolaolasanmi');

      expect(check).toEqual('Must be 10 characters or less!');
    });

    test('minLength', () => {
      const check = minLength(3)('Em');

      expect(check).toEqual('Must be 3 characters or more!');
    });

    test('isNumber', () => {
      const check = isNumber('uueui');

      expect(check).toEqual('Must be a number!');
    });

    test('minValue', () => {
      const check = minValue(200)(120);

      expect(check).toEqual('Must be at least 200!');
    });

    test('isEmail', () => {
      const check = isValidEmail('emiolaolasanmi@gmail');

      expect(check).toEqual('Invalid email address!');
    });

    test('isName', () => {
      const check = isName('Emiola Olasanmi**');

      expect(check).toEqual("Only letters and the characters '- allowed!");
    });

    test('isBusinessName', () => {
      const check = isBusinessName('My Business **Name');

      expect(check).toEqual("Only letters, spaces and the characters ,.'- allowed!");
    });

    test('isAddress', () => {
      const check = isAddress('3#, Macaulay');

      expect(check).toEqual("Only letters, numbers, spaces and the characters ,.'- allowed!");
    });

    test('isPhoneNumber', () => {
      const check = isPhoneNumber(12345678910);

      expect(check).toEqual('Phone number is invalid, must be 10 digits!');
    });

    test('isValidPasswordConfirm', () => {
      const check = isValidPasswordConfirm('emiolaolasanmiss', { password: 'emiolaolasanmi' });

      expect(check).toEqual('Passwords do not match');
    });
  });
});
