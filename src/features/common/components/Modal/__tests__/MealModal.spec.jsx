import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState, mealsObj } from 'src/config/tests/fixtures';
import MealModal from 'src/features/common/components/Modal/MealModal';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

describe('MealModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when type prop is addMeal', () => {
    const { container } = renderWithStore(<MealModal type="addMeal" submitting={false} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when type prop is editMeal', () => {
    const { container } = renderWithStore(
      <MealModal type="editMeal" submitting={false} meal={mealsObj.meals[0]} />
    );

    expect(container).toMatchSnapshot();
  });
});
