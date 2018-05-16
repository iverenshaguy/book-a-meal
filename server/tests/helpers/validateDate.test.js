import { expect } from 'chai';
import validateDate from '../../src/helpers/validateDate';

describe('validateDate', () => {
  it('returns true when valid', () => {
    const check = validateDate('2018-02-04');

    expect(check).to.equal(true);
  });

  it('throws an error when value is in wrong format', () => {
    expect(() => validateDate('02-04-2018')).to.throw('Date is invalid, valid format is YYYY-MM-DD');
  });

  it('throws an error when value is invalid', () => {
    expect(() => validateDate('2018-04-31')).to.throw('Date is invalid');
  });
});
