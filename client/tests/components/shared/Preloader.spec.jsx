import React from 'react';
import Preloader, { MiniPreloader } from '../../../src/components/shared/Preloader';

describe('Preloader', () => {
  it('should render Preloader component correctly', () => {
    const shallowWrapper = shallow(<Preloader />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should render MiniPreloader component correctly', () => {
    const shallowWrapper = shallow(<MiniPreloader />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
