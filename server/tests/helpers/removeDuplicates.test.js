import { expect } from 'chai';
import removeDuplicates from '../../src/helpers/removeDuplicates';
import { helpers } from '../utils/data';

const {
  removeDuplicates: {
    dupArr1, fltrdArr1, dupArr2, fltrdArr2, uniqueArr
  }
} = helpers;

describe('removeDuplicates', () => {
  it('returns unique array', () => {
    const check = removeDuplicates(dupArr1);

    expect(check).to.deep.equal(fltrdArr1);
  });

  it('returns unique array for string like array', () => {
    const check = removeDuplicates(dupArr2);

    expect(check).to.deep.equal(fltrdArr2);
  });

  it('returns array as is', () => {
    const check = removeDuplicates(uniqueArr);

    expect(check).to.deep.equal(uniqueArr);
  });
});
