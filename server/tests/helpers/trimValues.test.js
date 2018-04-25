import { expect } from 'chai';
import trimValues from '../../src/helpers/trimValues';

const untrimmedObj = {
  one: 'ioperj    ',
  two: '   jii',
  three: false
};

describe('trimValues', () => {
  it('returns trimmed object', () => {
    const check = trimValues(untrimmedObj);

    expect(check).to.deep.equal({
      one: 'ioperj',
      two: 'jii',
      three: false
    });
  });
});
