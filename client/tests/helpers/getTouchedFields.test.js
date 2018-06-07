import getTouchedFields from '../../src/helpers/getTouchedFields';

const fields = {
  email: true,
  password: false,
  name: false
};

describe('Get Touched Fields', () => {
  it('should return an pbject with 2 keys as touched', () => {
    const touched = getTouchedFields(fields);

    expect(touched[0]).toEqual('email');
  });
});
