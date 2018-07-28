import React from 'react';
import Dropdown from '../../../../src/components/shared/Dropdown';

describe('Dropdown', () => {
  it('renders correctly when type is simple notification', () => {
    const shallowWrapper = shallow(<Dropdown
      type="notification"
      toggler={<p>Click Me</p>}
      content={<div>Hey</div>}
    />);


    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when type is admin notification', () => {
    const shallowWrapper = shallow(<Dropdown
      type="admin-notification"
      toggler={<p>Click Me</p>}
      content={<div>Hey</div>}
    />);


    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('toggles showContent state to true on hover', () => {
    const wrapper = mount(<Dropdown
      type="notification"
      toggler={<p>Hover over Me</p>}
      content={<div>Hey</div>}
    />);

    wrapper.find('.dropdown').simulate('mouseEnter');
    expect(wrapper.state('showContent')).toEqual(true);

    wrapper.find('.dropdown').simulate('mouseLeave');
    expect(wrapper.state('showContent')).toEqual(false);

    wrapper.unmount();
  });
});
