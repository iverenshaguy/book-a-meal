import { expect } from 'chai';
import notEmpty from '../../src/helpers/notEmpty';

describe('notEmpty', () => {
  it('returns true when not empty', () => {
    const check = notEmpty('yes', 'string cannot be empty');

    expect(check).to.equal(true);
  });

  it('throws an error when value is empty', () => {
    const check = notEmpty('yes', 'string cannot be empty');

    expect(check).to.throw(new Error('string cannot be empty'));
  });
});
