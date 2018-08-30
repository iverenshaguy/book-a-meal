import React from 'react';
import Footer from '../../../../src/components/shared/Footer';

describe('Footer', () => {
  it('should render the Footer component correctly', () => {
    const shallowWrapper = shallow(<Footer />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
