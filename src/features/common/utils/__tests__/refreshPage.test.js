import { customerToken, expiredToken } from 'src/config/tests/fixtures';
import jwtDecode from 'jwt-decode';
import refreshPage from 'src/features/common/utils/refreshPage';

const store = {
  dispatch: jest.fn((action) => action),
};

jest.mock('jwt-decode');

describe('Refresh page', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should refresh page if jwt token is present and not expired', () => {
    jwtDecode.mockImplementation(() => ({ exp: Math.floor(Date.now() / 1000) + 1 }));

    localStorage.setItem('jwtToken', customerToken);

    refreshPage(store);

    expect(store.dispatch).toBeCalled();
  });

  it('should dispatch type UNAUTHENTICATED if jwt token is present and expired', () => {
    jwtDecode.mockImplementation(() => ({ exp: 0 }));

    localStorage.setItem('jwtToken', expiredToken);

    refreshPage(store);

    expect(store.dispatch).toBeCalledWith({ type: 'UNAUTHENTICATED' });
  });

  it('should dispatch type UNAUTHENTICATED if jwt token is not preset', () => {
    localStorage.clear();

    refreshPage(store);

    expect(store.dispatch).toBeCalledWith({ type: 'UNAUTHENTICATED' });
  });
});
