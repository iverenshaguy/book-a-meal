import React from 'react';
import MealForm from '../../../../src/components/shared/Form/MealForm';
import { formComponentSetup } from '../../../setup/formSetup';
import { mealsObj } from '../../../setup/mockData';

describe('MealForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the Meal Form correctly when type prop is addMeal', () => {
    const { handlers, state } = formComponentSetup('addMeal');
    const wrapper = shallow(<MealForm type="addMeal" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render the Meal Form correctly when type prop is editMeal', () => {
    const { handlers, state } = formComponentSetup('editMeal');
    const wrapper = shallow(<MealForm type="editMeal" state={state} handlers={handlers} meal={mealsObj.meals[0]} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
