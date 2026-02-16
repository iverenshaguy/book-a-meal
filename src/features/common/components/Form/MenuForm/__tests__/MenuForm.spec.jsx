import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initialState, mealsObj, metadata } from 'src/config/tests/fixtures';
import WrappedMenuForm, { MenuForm } from 'src/features/common/components/Form/MenuForm/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const defaultProps = {
  meals: mealsObj.meals,
  menu: {
    id: '1234',
    date: '2018-06-16',
    meals: [mealsObj.meals[0]],
  },
  isFetching: false,
  fetchMeals: jest.fn(),
  fetchMenu: jest.fn(),
  clearMenuError: jest.fn(),
  addMenu: jest.fn(),
  editMenu: jest.fn(),
  submitting: false,
  submitError: null,
  menuMetadata: metadata,
  mealsMetadata: metadata,
};

const { now } = Date;

describe('MenuForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render the MenuForm correctly', () => {
    const { container } = render(<MenuForm {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the MenuForm correctly when fetching', () => {
    const { container } = render(<MenuForm {...defaultProps} isFetching />);
    expect(container).toMatchSnapshot();
  });

  it('should render the MenuForm correctly when submitting', () => {
    const { container } = render(<MenuForm {...defaultProps} submitting />);
    expect(container).toMatchSnapshot();
  });

  it('should render the MenuForm correctly when there is a submit error', () => {
    const { container } = render(<MenuForm {...defaultProps} submitError="Error" />);
    expect(container).toMatchSnapshot();
  });

  it('should render the MenuForm correctly when there is a date error', () => {
    const errorObj = { date: { value: 'Error' } };
    const { container } = render(<MenuForm {...defaultProps} submitError={errorObj} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the MenuForm correctly when there are no caterer meals', () => {
    const { container } = render(<MenuForm {...defaultProps} meals={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should add meal to state when meal is selected', async () => {
    const user = userEvent.setup();
    render(<MenuForm {...defaultProps} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const secondMealCheckbox = checkboxes.find((c) => c.id === '36d525d1-efc9-4b75-9999-3e3d8dc64ce3');
    await user.click(secondMealCheckbox);
    expect(secondMealCheckbox).toBeChecked();
  });

  it('should remove meal from state when meal is deselected', async () => {
    const user = userEvent.setup();
    render(<MenuForm {...defaultProps} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const firstMealCheckbox = checkboxes.find((c) => c.id === '81211c24-51c0-46ec-b1e0-18db55880958');
    expect(firstMealCheckbox).toBeChecked();
    await user.click(firstMealCheckbox);
    expect(firstMealCheckbox).not.toBeChecked();
  });

  it('should change date in state when date is changed', () => {
    render(<MenuForm {...defaultProps} />);
    const dateInput = document.getElementById('datepicker');
    fireEvent.change(dateInput, { target: { value: '2018-04-27' } });
    expect(screen.getByText(/27th April 2018/)).toBeInTheDocument();
  });

  it('should not change date in state when date is changed but is lower than current date', () => {
    render(<MenuForm {...defaultProps} />);
    const dateInput = document.getElementById('datepicker');
    fireEvent.change(dateInput, { target: { value: '1969-01-01' } });
    expect(screen.getByText(/Thursday, 1st January 1970/i)).toBeInTheDocument();
  });

  it('should submit Menu Form when adding a new menu', async () => {
    const user = userEvent.setup();
    const addMenuMock = jest.fn();
    const menu = { id: null, date: '2018-06-16', meals: [] };
    render(<MenuForm {...defaultProps} menu={menu} addMenu={addMenuMock} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const firstMealCheckbox = checkboxes.find((c) => c.id === '81211c24-51c0-46ec-b1e0-18db55880958');
    await user.click(firstMealCheckbox);
    await user.click(screen.getByRole('button', { name: /save meal options/i }));
    expect(addMenuMock).toHaveBeenCalled();
  });

  it('should submit Menu Form when editing a menu', async () => {
    const user = userEvent.setup();
    const editMenuMock = jest.fn();
    render(<MenuForm {...defaultProps} editMenu={editMenuMock} />);
    await user.click(screen.getByRole('button', { name: /save meal options/i }));
    expect(editMenuMock).toHaveBeenCalled();
  });

  it('should not submit a Menu Form when the meal state is empty', async () => {
    const user = userEvent.setup();
    const addMenuMock = jest.fn();
    const menu = { id: null, date: '2018-06-16', meals: [] };
    render(<MenuForm {...defaultProps} menu={menu} addMenu={addMenuMock} />);
    await user.click(screen.getByRole('button', { name: /save meal options/i }));
    expect(addMenuMock).not.toHaveBeenCalled();
  });

  it('should render the connected MenuForm component correctly', () => {
    const storeWithMenuData = mockStore({
      ...initialState,
      meals: { ...initialState.meals, items: mealsObj.meals, metadata },
      menu: {
        ...initialState.menu,
        currentDay: '2018-06-16',
        meals: [mealsObj.meals[0]],
        id: '1234',
        metadata,
      },
      isFetching: false,
    });
    const { container } = render(
      <Provider store={storeWithMenuData}>
        <WrappedMenuForm />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should call fetchMeals and fetchMenu on mount', () => {
    render(<MenuForm {...defaultProps} />);
    expect(defaultProps.fetchMeals).toHaveBeenCalled();
    expect(defaultProps.fetchMenu).toHaveBeenCalled();
  });

  it('should pass loadMore to InfiniteLoader when meals metadata has next url', () => {
    render(<MenuForm {...defaultProps} />);
    expect(screen.getByText(/save meal options/i)).toBeInTheDocument();
    expect(document.querySelector('.infinite-scroll-component')).toBeInTheDocument();
  });

  it('should render the connected MenuForm with empty menuMetadata correctly', () => {
    const storeWithMenuData = mockStore({
      ...initialState,
      meals: { ...initialState.meals, items: mealsObj.meals, metadata },
      menu: {
        ...initialState.menu,
        currentDay: '2018-06-16',
        meals: [mealsObj.meals[0]],
        id: '1234',
        metadata: {},
      },
      isFetching: false,
    });
    const { container } = render(
      <Provider store={storeWithMenuData}>
        <WrappedMenuForm />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
