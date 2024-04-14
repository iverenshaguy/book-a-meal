import React from 'react';
import App from 'src/features/app';

describe('App', () => {
  it('should render the app component correctly', () => {
    const shallowWrapper = shallow(<App />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
