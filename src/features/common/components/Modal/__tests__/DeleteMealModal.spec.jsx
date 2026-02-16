import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState, mealsObj } from 'src/config/tests/fixtures';
import WrappedDeleteMealModal, { DeleteMealModal } from 'src/features/common/components/Modal/DeleteMealModal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  ...initialState,
  meals: { ...initialState.meals, items: mealsObj.meals },
});
const props = {
  editMeal: jest.fn(),
  deleteMeal: jest.fn(),
  toggleModal: jest.fn(),
  deleting: false,
  meal: mealsObj.meals[1],
};

describe('DeleteMealModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<DeleteMealModal {...props} />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.delete-meal')).toBeInTheDocument();
    expect(container.querySelector('[role="progressbar"]')).not.toBeInTheDocument();
  });

  it('should render MiniPreloader when deleting', () => {
    const { container } = render(<DeleteMealModal {...props} deleting />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
    expect(container.querySelector('.delete-meal')).not.toBeInTheDocument();
  });

  it('should render connected component correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <WrappedDeleteMealModal {...props} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should call toggleModal when delete meal is not confirmed', async () => {
    const user = userEvent.setup();
    const toggleModalMock = jest.fn();
    render(
      <Provider store={store}>
        <DeleteMealModal {...props} toggleModal={toggleModalMock} />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /^no$/i }));

    expect(toggleModalMock).toHaveBeenCalled();
  });

  it('should call handleDeleteClick when delete meal is confirmed', async () => {
    const user = userEvent.setup();
    const deleteMealMock = jest.fn();
    render(
      <Provider store={store}>
        <DeleteMealModal {...props} deleteMeal={deleteMealMock} />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /^yes$/i }));

    expect(deleteMealMock).toHaveBeenCalled();
  });
});
