import { expect } from 'chai';
import notEmpty from '../../src/helpers/notEmpty';

describe('notEmpty', () => {
  it('returns true when value is not empty', () => {
    const check = notEmpty('yes', 'string field cannot be left blank');

    expect(check).to.equal(true);
  });

  it('throws an error when value is empty', () => {
    expect(() => notEmpty('', 'string field cannot be left blank')).to.throw('string field cannot be left blank');
  });
});
