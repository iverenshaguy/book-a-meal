import React from 'react';
import CatererHeader from '../../../../src/components/shared/Header/CatererHeader';

const { now } = Date;

describe('CatererHeader', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<CatererHeader currentDay="1970-01-01" toggleSideNav={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
