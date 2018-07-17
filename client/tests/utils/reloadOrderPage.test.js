import reloadOrderPage from '../../src/utils/reloadOrderPage';

const dispatchMock = jest.fn();

describe('Reload Order Page', () => {
  afterAll(() => jest.clearAllMocks());

  it('calls dispatch on timeout', () => {
    jest.useFakeTimers();

    reloadOrderPage(dispatchMock, '/');

    jest.advanceTimersByTime(90000);

    expect(dispatchMock).toHaveBeenCalled();
  });
});
