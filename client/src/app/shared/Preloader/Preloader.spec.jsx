import React from 'react';
import Preloader, { MiniPreloader } from '../Preloader';

describe('Preloader', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Preloader />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly: MiniPreloader', () => {
    const shallowWrapper = shallow(<MiniPreloader />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
