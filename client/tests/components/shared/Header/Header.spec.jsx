import React from 'react';
import Header from '../../../../src/app/shared/Header';

describe('Header', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Header type="home" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders unauthenticated header correctly', () => {
    const shallowWrapper = shallow(<Header type="unauth" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
