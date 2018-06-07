import { customerToken, expiredToken } from '../setup/data';
import refreshPage from '../../src/utils/refreshPage';

// jest.mock(operations.resetUser);
// jest.mock(operations.authenticateUser);

const store = {
  dispatch: jest.fn(action => action)
};

describe('Refresh page', () => {
  afterAll(() => jest.clearAllMocks());

  it('refreshes user if jwt token is present and not expired', () => {
    localStorage.setItem('jwtToken', customerToken);

    refreshPage(store);

    expect(store.dispatch).toBeCalled();
  });

  it('resets user if jwt token is present and expired', () => {
    localStorage.setItem('jwtToken', expiredToken);

    refreshPage(store);

    expect(store.dispatch).toBeCalledWith({ type: 'UNAUTHENTICATED' });
  });

  it('resets user if jwt token is not preset', () => {
    localStorage.clear();

    refreshPage(store);

    expect(store.dispatch).toBeCalledWith({ type: 'UNAUTHENTICATED' });
  });
});
