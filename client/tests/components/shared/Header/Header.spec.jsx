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

  it('renders correctly', () => {
    const shallowWrapper = shallow(<Header type="home" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders unauthenticated header correctly', () => {
    const shallowWrapper = shallow(<Header type="unauth" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders caterer header correctly', () => {
    const shallowWrapper = shallow(<Header type="caterer" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
