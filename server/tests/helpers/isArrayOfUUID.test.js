import { expect } from 'chai';
import isArrayOfUUID from '../../src/helpers/isArrayOfUUID';

const UUIDArr = [
  '72a3417e-45c8-4559-8b74-8b5a61be8614',
  '8a65538d-f862-420e-bcdc-80743df06578',
  'f9eb7652-125a-4bcb-ad81-02f84901cdc3'
];

const nonUUIDArr = ['jdjkd', 'diieie'];

describe('isArrayOfUUID', () => {
  it('returns true when it is an array of UUIDs', () => {
    const check = isArrayOfUUID(UUIDArr);

    expect(check).to.equal(true);
  });

  it('returns false when it is not an array of UUIDs', () => {
    expect(() => isArrayOfUUID(nonUUIDArr)).to.throw('MealId jdjkd is invalid, MealId diieie is invalid');
  });
});
