import React from 'react';
import MealCard from '../../../../src/app/shared/MealCard';
import { caterersMealsObj } from '../../../setup/data';

describe('MealModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when type is caterer', () => {
    const wrapper = shallow(<MealCard type="caterer" meal={caterersMealsObj.meals[0]} toggleModal={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('#edit-meal')).toBeTruthy();
  });

  it('renders correctly when type is user', () => {
    const wrapper = shallow(<MealCard type="user" meal={caterersMealsObj.meals[0]} toggleModal={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.meal-card-action')).toBeTruthy();
  });
});
