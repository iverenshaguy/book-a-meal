import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WrappedMeals, { Meals } from 'src/features/meals/Meals';
import { caterer, mealsObj, initialState, metadata } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  meals: { ...initialState.meals, items: mealsObj.meals, metadata },
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
});
const { now } = Date;

describe('Meals', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  const renderWithProvider = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render Meal component correctly when there are available meals', () => {
    const toggleMock = jest.fn();
    const { container } = renderWithProvider(
      <Meals
        fetchMeals={jest.fn()}
        {...mealsObj}
        submitting={false}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getAllByText(/Jollof Rice/i).length).toBeGreaterThan(0);
  });

  it('should start fetching meals when Meal component is loaded', () => {
    const toggleMock = jest.fn();
    const fetchMealsMock = jest.fn();
    renderWithProvider(
      <Meals
        fetchMeals={fetchMealsMock}
        {...mealsObj}
        submitting={false}
        toggleModal={toggleMock}
        metadata={{}}
      />
    );
    expect(fetchMealsMock).toHaveBeenCalled();
  });

  it('should open meal modal when the "Add Meal" button is clicked', async () => {
    const user = userEvent.setup();
    const toggleMock = jest.fn();
    renderWithProvider(
      <Meals
        fetchMeals={jest.fn()}
        {...mealsObj}
        submitting={false}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );
    const addBtn = document.querySelector('#add-meal-btn');
    await user.click(addBtn);
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should show "You Do Not Have Any Meals Yet" message when caterer has no meals', () => {
    const toggleMock = jest.fn();
    const { container } = renderWithProvider(
      <Meals
        fetchMeals={jest.fn()}
        meals={[]}
        submitting={false}
        toggleModal={toggleMock}
        metadata={{}}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('You Do Not Have Any Meals Yet')).toBeInTheDocument();
  });

  it('should render Meal Component when connected to the redux store correctly', () => {
    const dispatchMock = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <WrappedMeals dispatch={dispatchMock} {...mealsObj} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
