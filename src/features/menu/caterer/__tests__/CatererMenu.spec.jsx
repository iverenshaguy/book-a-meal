import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WrappedCatererMenu, { CatererMenu } from 'src/features/menu/caterer/CatererMenu';
import { caterer, mealsObj, initialState, metadata } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  menu: { ...initialState.menu, meals: mealsObj.meals },
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
});
const { now } = Date;

describe('CatererMenu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  const renderWithProvider = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render CatererMenu component correctly and show Meal Cards', () => {
    const toggleMock = jest.fn();
    const { container } = renderWithProvider(
      <CatererMenu
        user={caterer}
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getAllByText(/Jollof Rice/i).length).toBeGreaterThan(0);
  });

  it('should open CatererMenu modal when "Set Menu" button is clicked', async () => {
    const user = userEvent.setup();
    const toggleMock = jest.fn();
    renderWithProvider(
      <CatererMenu
        user={caterer}
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );
    const setMenuBtn = document.querySelector('#menu-modal-btn');
    await user.click(setMenuBtn);
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should call setCurrentDay when date input is changed', async () => {
    const user = userEvent.setup();
    const setCurrentDayMock = jest.fn();
    renderWithProvider(
      <CatererMenu
        user={caterer}
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={setCurrentDayMock}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={jest.fn()}
        metadata={metadata}
      />
    );
    const dateInput = document.querySelector('.date input');
    if (dateInput) {
      await user.clear(dateInput);
      await user.type(dateInput, moment().format('YYYY-MM-DD'));
      expect(setCurrentDayMock).toHaveBeenCalled();
    }
  });

  it('should render message when there are no meals on the menu', () => {
    const toggleMock = jest.fn();
    const { container } = renderWithProvider(
      <CatererMenu
        user={caterer}
        fetchMenu={jest.fn()}
        meals={[]}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('There are no Meal Items on this Menu')).toBeInTheDocument();
  });

  it('should not show "Set Menu" button when currentDay is in the past', () => {
    const toggleMock = jest.fn();
    const { rerender } = renderWithProvider(
      <CatererMenu
        user={caterer}
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );
    expect(document.querySelector('#menu-modal-btn')).toBeInTheDocument();
    rerender(
      <Provider store={store}>
        <CatererMenu
          user={caterer}
          fetchMenu={jest.fn()}
          {...mealsObj}
          submitting={false}
          setCurrentDay={jest.fn()}
          currentDay="1969-04-27"
          toggleModal={toggleMock}
          metadata={metadata}
        />
      </Provider>
    );
    expect(document.querySelector('#menu-modal-btn')).not.toBeInTheDocument();
  });

  it('should render CatererMenu Component when connected to the redux store', () => {
    const { container } = render(
      <Provider store={store}>
        <WrappedCatererMenu {...mealsObj} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
