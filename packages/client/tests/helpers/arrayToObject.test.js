import arrayToObject from '../../src/helpers/arrayToObject';

describe('Utils: arrayToObject', () => {
  it('should create a new object from array', () => {
    const obj = arrayToObject(['firstname', 'lastname'], true);

    expect(obj).toEqual({ firstname: true, lastname: true });
  });
});
