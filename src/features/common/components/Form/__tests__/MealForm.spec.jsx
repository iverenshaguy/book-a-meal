import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState, mealsObj } from 'src/config/tests/fixtures';
import { render } from '@testing-library/react';
import MealForm from 'src/features/common/components/Form/MealForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

describe('MealForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render the Meal Form correctly when type prop is addMeal', () => {
    const { handlers, state } = formComponentSetup('addMeal');
    const { container } = renderWithStore(
      <MealForm type="addMeal" state={state} handlers={handlers} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the Meal Form correctly when type prop is editMeal', () => {
    const { handlers, state } = formComponentSetup('editMeal');
    const { container } = renderWithStore(
      <MealForm
        type="editMeal"
        state={state}
        handlers={handlers}
        meal={mealsObj.meals[0]}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
