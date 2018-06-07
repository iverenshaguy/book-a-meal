import React from 'react';
import CatererHeader from '../../../../src/app/shared/Header/CatererHeader';


describe('CatererHeader', () => {
  it('renders correctly', () => {
    const { now } = Date;
    Date.now = jest.fn(() => 0); // mock Date now

    try {
      const shallowWrapper = shallow(<CatererHeader />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
    } finally {
      Date.now = now; // restore original now method on Date object
    }
  });
});
