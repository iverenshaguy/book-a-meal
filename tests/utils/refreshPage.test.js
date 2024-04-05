import { customerToken, expiredToken } from '../setup/mockData';
import refreshPage from '../../src/utils/refreshPage';

const store = {
  dispatch: jest.fn(action => action)
};

describe('Refresh page', () => {
  afterAll(() => jest.clearAllMocks());

  it('should refresh page if jwt token is present and not expired', () => {
    localStorage.setItem('jwtToken', customerToken);

    refreshPage(store);

    expect(store.dispatch).toBeCalled();
  });

  it('should dispatch type UNAUTHENTICATED if jwt token is present and expired', () => {
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
