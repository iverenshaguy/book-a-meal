import React from 'react';
import LinkComp from 'src/features/common/components/Link';

describe('Link', () => {
  it('should render Link component correctly', () => {
    const shallowWrapper = shallow(<LinkComp clickHandler={jest.fn()}>Click</LinkComp>);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
