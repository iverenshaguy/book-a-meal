import React from 'react';
import MealForm from '../../../../src/app/shared/Form/MealForm';
import { formComponentSetup } from '../../../../tests/setup/formSetup';

describe('MealForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('addMeal: renders correctly', () => {
    const { handlers, state } = formComponentSetup('addMeal');
    const wrapper = shallow(<MealForm type="addMeal" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
