import validateRequiredFields from '../../../src/helpers/validations/validateRequiredFields';

const values = {
  email: 'emiolaolasanmi@gmail.com',
  name: '',
};

describe('Validate Required Fields', () => {
  it('should return true if all required fields are filled', () => {
    const check = validateRequiredFields(['email'], values);

    expect(check).toBeTruthy();
  });

  it('should return false if all required fields are not filled', () => {
    const check = validateRequiredFields(['name'], values);

    expect(check).toBeFalsy();
  });
});
