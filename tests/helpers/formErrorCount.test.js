import formErrorCount from '../../src/helpers/formErrorCount';

const errors = {
  email: 'invalid',
  password: 'required',
  name: null
};

describe('Form Error Count', () => {
  it('should return 2 as error length', () => {
    const errorCount = formErrorCount(errors);

    expect(errorCount).toEqual(2);
  });
});
