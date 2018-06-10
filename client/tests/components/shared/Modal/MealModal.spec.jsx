import React from 'react';
import MealModal from '../../../../src/app/shared/Modal/MealModal';

describe('MealModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when type is addMeal', () => {
    const shallowWrapper = shallow(<MealModal type="addMeal" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when type is editMeal', () => {
    const shallowWrapper = shallow(<MealModal type="editMeal" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
