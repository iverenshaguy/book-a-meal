import validateRequiredFields from '../../../src/helpers/validations/validateRequiredFields';

const values = {
  email: 'emiolaolasanmi@gmail.com',
  name: '',
};

describe('Validate Required Fields', () => {
  it('returns true if all required fields are filled', () => {
    const check = validateRequiredFields(['email', 'name'], ['email'], values);

    expect(check).toBeTruthy();
  });

  it('returns false if all required fields are not filled', () => {
    const check = validateRequiredFields(['email', 'name'], ['name'], values);

    expect(check).toBeFalsy();
  });

  it('returns false if all required fields are not touched', () => {
    const check = validateRequiredFields(['email'], ['name'], values);

    expect(check).toBeFalsy();
  });
});
