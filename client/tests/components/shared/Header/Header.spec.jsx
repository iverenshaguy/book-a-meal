import React from 'react';
import Header from '../../../../src/components/shared/Header';

const { now } = Date;

describe('Header', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date().setMilliseconds(0));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render Header component correctly', () => {
    const shallowWrapper = shallow(<Header type="home" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should render unauthenticated Header component correctly when type prop is unauth', () => {
    const shallowWrapper = shallow(<Header type="unauth" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should render Caterer Header component correctly when type prop is caterer', () => {
    const shallowWrapper = shallow(<Header type="caterer" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
