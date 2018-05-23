import arrayToObject from '../../src/utils/arrayToObject';

describe('Utils: arrayToObject', () => {
  test('creates new object from array', () => {
    const obj = arrayToObject(['firstname', 'lastname'], true);

    expect(obj).toEqual({ firstname: true, lastname: true });
  });
});
