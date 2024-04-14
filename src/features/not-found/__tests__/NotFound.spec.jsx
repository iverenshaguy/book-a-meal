import React from 'react';
import NotFound from 'src/features/not-found';

describe('NotFound', () => {
  it('should render NotFound component correctly', () => {
    const shallowWrapper = shallow(<NotFound />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
