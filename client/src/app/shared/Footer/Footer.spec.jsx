import React from 'react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Footer />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
