import React from 'react';
import MealModal from '../../../../src/app/shared/Modal/MealModal';

describe('MealModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<MealModal type="addMeal" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
