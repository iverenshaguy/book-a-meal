import React from 'react';
import App from '../../../src/components/App';

describe('App', () => {
  it('should render the App component correctly', () => {
    const shallowWrapper = shallow(<App />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
