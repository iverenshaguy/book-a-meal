import React from 'react';
import MealForm from '../../../../src/app/shared/Form/MealForm';
import { formComponentSetup } from '../../../../tests/setup/formSetup';
import { caterersMealsObj } from '../../../setup/data';

describe('MealForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when type is addMeal', () => {
    const { handlers, state } = formComponentSetup('addMeal');
    const wrapper = shallow(<MealForm type="addMeal" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when type is editMeal', () => {
    const { handlers, state } = formComponentSetup('editMeal');
    const wrapper = shallow(<MealForm type="editMeal" state={state} handlers={handlers} meal={caterersMealsObj.meals[0]} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
