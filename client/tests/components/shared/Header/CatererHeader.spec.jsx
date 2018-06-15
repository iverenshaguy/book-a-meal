import React from 'react';
import CatererHeader from '../../../../src/app/shared/Header/CatererHeader/CatererHeader';

const { now } = Date;

describe('CatererHeader', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<CatererHeader currentDay="1970-01-01" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
