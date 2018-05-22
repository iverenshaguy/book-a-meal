import React from 'react';
import { FooterComponent as Footer } from '../../../../app/shared/Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Footer />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
