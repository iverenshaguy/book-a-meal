import React from 'react';
import LinkComp from '../../../../src/components/shared/Link';

describe('Link', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<LinkComp clickHandler={jest.fn()}>Click</LinkComp>);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
