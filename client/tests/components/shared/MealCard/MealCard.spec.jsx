import React from 'react';
import MealCard from '../../../../src/components/shared/MealCard';
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
});
