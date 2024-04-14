import React from 'react';
import Footer from 'src/features/common/components/Footer';

describe('Footer', () => {
  it('should render the Footer component correctly', () => {
    const shallowWrapper = shallow(<Footer />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
