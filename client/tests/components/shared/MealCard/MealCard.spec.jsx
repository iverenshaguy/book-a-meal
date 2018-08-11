import React from 'react';
import moment from 'moment';
import MealCard from '../../../../src/components/shared/MealCard';
import { caterersMealsObj } from '../../../setup/mockData';

describe('MealCard', () => {
  // beforeAll(() => {

  // });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when type is caterer', () => {
    const wrapper = shallow(<MealCard type="caterer" meal={caterersMealsObj.meals[0]} toggleModal={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('#edit-meal')).toBeTruthy();
  });

  it('renders correctly when type is customer', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
    const wrapper = shallow(<MealCard type="customer" meal={caterersMealsObj.meals[0]} toggleModal={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.meal-card-action')).toBeTruthy();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('calls toggleModal on edit meal click', () => {
    const toggleMock = jest.fn();
    const wrapper = mount(<MealCard type="caterer" meal={caterersMealsObj.meals[0]} toggleModal={toggleMock} />);

    wrapper.find('button#edit-meal').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('calls toggleModal on delete meal click', () => {
    const toggleMock = jest.fn();
    const wrapper = mount(<MealCard type="caterer" meal={caterersMealsObj.meals[0]} toggleModal={toggleMock} />);

    wrapper.find('button#delete-meal').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('does not show order meal button when shop is closed', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 18 * 1000));
    const orderMealMock = jest.fn();
    const wrapper = mount(<MealCard type="customer" meal={caterersMealsObj.meals[0]} orderMeal={orderMealMock} />);


    expect(wrapper.find('button.meal-card-btn').length).toBeFalsy();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('shows order meal button and calls orderMeal prop on  order meal button click when shop is open', () => {
    const currentDay = moment().format('YYYY-MM-DD');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
    const orderMealMock = jest.fn();
    const wrapper = mount(<MealCard type="customer" meal={caterersMealsObj.meals[0]} orderMeal={orderMealMock} />);


    wrapper.find('button.meal-card-btn').simulate('click');
    expect(orderMealMock).toHaveBeenCalled();
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });
});
