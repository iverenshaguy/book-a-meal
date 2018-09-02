import React from 'react';
import moment from 'moment';
import MealCard from '../../../../src/components/shared/MealCard';
import { mealsObj } from '../../../setup/mockData';

describe('MealCard', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when type is caterer', () => {
    const wrapper = shallow(<MealCard type="caterer" meal={mealsObj.meals[0]} toggleModal={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('#edit-meal')).toBeTruthy();
  });

  it('should render correctly when type is customer', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
    const wrapper = shallow(<MealCard type="customer" meal={mealsObj.meals[0]} toggleModal={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.meal-card-action')).toBeTruthy();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should call toggleModal on edit meal click', () => {
    const toggleMock = jest.fn();
    const wrapper = mount(<MealCard type="caterer" meal={mealsObj.meals[0]} toggleModal={toggleMock} />);

    wrapper.find('button#edit-meal').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should call toggleModal on delete meal click', () => {
    const toggleMock = jest.fn();
    const wrapper = mount(<MealCard type="caterer" meal={mealsObj.meals[0]} toggleModal={toggleMock} />);

    wrapper.find('button#delete-meal').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should not show order meal button when shop is closed', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 18 * 1000));
    const orderMealMock = jest.fn();
    const wrapper = mount(<MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} />);


    expect(wrapper.find('button.meal-card-btn').length).toBeFalsy();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should show order meal button and should call orderMeal prop on order meal button click when shop is open', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
    const orderMealMock = jest.fn();
    const wrapper = mount(<MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} />);


    wrapper.find('button.meal-card-btn').simulate('click');
    expect(orderMealMock).toHaveBeenCalled();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should show disabled button with "Added to Basket" when meal is in order basket', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
    const orderMealMock = jest.fn();
    const wrapper = mount(<MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} inBasket />);


    expect(wrapper.find('button.meal-card-btn').props().disabled).toEqual('disabled');
    expect(wrapper.find('button.meal-card-btn').props().children).toEqual('Added To Basket');
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should show active button with "Add to Basket" when meal is not in order basket', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
    const orderMealMock = jest.fn();
    const wrapper = mount(<MealCard type="customer" meal={mealsObj.meals[0]} orderMeal={orderMealMock} inBasket={false} />);

    expect(wrapper.find('button.meal-card-btn').props().disabled).toEqual(null);
    expect(wrapper.find('button.meal-card-btn').props().children).toEqual('Add To Basket');
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });
});
