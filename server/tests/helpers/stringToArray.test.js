import { expect } from 'chai';
import stringToArray from '../../src/helpers/stringToArray';

const arr = ['iie', 'iwiw'];
const arrStr = "['iie', 'iwiw']";

describe('stringToArray', () => {
  it('returns the array when an array is passed into it', () => {
    const check = stringToArray(arr);

    expect(check).to.deep.equal(arr);
  });

  it('returns an array when an array like string is passed into it', () => {
    const check = stringToArray(arrStr);

    expect(check).to.deep.equal(['iie', 'iwiw']);
  });

  it('returns an array when a string is passed into it', () => {
    const check = stringToArray('arrStr');

    expect(check).to.deep.equal(['arrStr']);
  });
});
