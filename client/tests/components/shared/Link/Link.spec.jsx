import React from 'react';
import LinkComp from '../../../../src/app/shared/Link';

describe('Link', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<LinkComp clickHandler={jest.fn()}>Click</LinkComp>);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
