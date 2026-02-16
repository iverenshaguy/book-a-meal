import decodeToken from 'src/features/common/utils/decodeToken';
import { customerToken } from 'src/config/tests/fixtures';

jest.mock('jwt-decode', () => () => ({ businessName: 'A Name' }));

const returnValue = {
  decoded: { businessName: 'A Name' },
  token: customerToken,
};

describe('Utils: decodeToken', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should decode token', () => {
    localStorage.setItem('jwtToken', customerToken);
    const check = decodeToken();

    expect(check).toEqual(returnValue);
  });
});
