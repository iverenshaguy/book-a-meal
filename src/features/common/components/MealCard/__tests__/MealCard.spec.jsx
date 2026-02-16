import React from 'react';
import moment from 'moment';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MealCard from 'src/features/common/components/MealCard';
import { mealsObj } from 'src/config/tests/fixtures';

describe('MealCard', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when type is caterer', () => {
    const { container } = render(
      <MealCard type="caterer" meal={mealsObj.meals[0]} toggleModal={jest.fn()} />
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('should render correctly when type is customer', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(currentDay).getTime() + 60 * 60 * 13 * 1000);
    const { container } = render(
      <MealCard type="customer" meal={mealsObj.meals[0]} toggleModal={jest.fn()} />
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.meal-card-action')).toBeInTheDocument();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should call toggleModal on edit meal click', async () => {
    const user = userEvent.setup();
    const toggleMock = jest.fn();
    render(<MealCard type="caterer" meal={mealsObj.meals[0]} toggleModal={toggleMock} />);

    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should call toggleModal on delete meal click', async () => {
    const user = userEvent.setup();
    const toggleMock = jest.fn();
    render(<MealCard type="caterer" meal={mealsObj.meals[0]} toggleModal={toggleMock} />);

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should not show order meal button when shop is closed', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(currentDay).getTime() + 60 * 60 * 18 * 1000);
    const orderMealMock = jest.fn();
    render(<MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} />);

    expect(screen.queryByRole('button', { name: /add to basket/i })).not.toBeInTheDocument();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should show order meal button and should call orderMeal prop on order meal button click when shop is open', async () => {
    const user = userEvent.setup();
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(currentDay).getTime() + 60 * 60 * 13 * 1000);
    const orderMealMock = jest.fn();
    render(<MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} />);

    await user.click(screen.getByRole('button', { name: /add to basket/i }));
    expect(orderMealMock).toHaveBeenCalled();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should show disabled button with "Added to Basket" when meal is in order basket', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(currentDay).getTime() + 60 * 60 * 13 * 1000);
    const orderMealMock = jest.fn();
    render(
      <MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} inBasket />
    );

    const btn = screen.getByRole('button', { name: /added to basket/i });
    expect(btn).toBeDisabled();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should show active button with "Add to Basket" when meal is not in order basket', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(currentDay).getTime() + 60 * 60 * 13 * 1000);
    const orderMealMock = jest.fn();
    render(
      <MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} inBasket={false} />
    );

    const btn = screen.getByRole('button', { name: /add to basket/i });
    expect(btn).not.toBeDisabled();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });
});
