import React from 'react';
import CatererHeader from '../../../../src/app/shared/Header/CatererHeader';

const { now } = Date;

describe('CatererHeader', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<CatererHeader />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
