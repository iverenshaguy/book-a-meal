import React from 'react';
import { HeaderComponent as Header } from '../../../../app/shared/Header';

describe('Header', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Header />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
