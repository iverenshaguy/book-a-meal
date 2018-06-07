import jwt from 'jsonwebtoken';
import decodeToken from '../../src/utils/decodeToken';
import { customerToken } from '../setup/data';

// mock jwt decode method
const { decode } = jwt.decode;
jwt.decode = jest.fn(() => ({
  businessName: 'A Name'
}));

const returnValue = {
  decoded: { businessName: 'A Name' },
  token: customerToken
};

describe('Utils: decodeToken', () => {
  afterAll(() => {
    // restore mock
    jwt.decode = decode;
  });

  test('works as expected', () => {
    localStorage.setItem('jwtToken', customerToken);
    const check = decodeToken();

    expect(check).toEqual(returnValue);
  });
});
