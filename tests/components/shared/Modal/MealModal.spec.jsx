import React from 'react';
import MealModal from '../../../../src/components/shared/Modal/MealModal';

describe('MealModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when type prop is addMeal', () => {
    const shallowWrapper = shallow(<MealModal type="addMeal" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should render correctly when type prop is editMeal', () => {
    const shallowWrapper = shallow(<MealModal type="editMeal" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
