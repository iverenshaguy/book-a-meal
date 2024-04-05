import React from 'react';
import { RenderInput } from '../../../../src/components/shared/FormComponents';

const functionMock = jest.fn();

describe('Form Components: RenderInput', () => {
  const cleanProps = {
    name: 'email',
    placeholder: 'jane',
    type: 'email',
    id: 'email',
    label: 'Email',
    required: true,
    meta: {
      touched: false,
      error: null,
      asyncValidating: false
    },
    handleChange: functionMock,
    handleBlur: functionMock,
    handleFocus: functionMock,
    value: ''
  };

  const dirtyProps = {
    name: 'email',
    placeholder: 'jane',
    type: 'email',
    id: 'email',
    label: 'Email',
    required: true,
    meta: {
      touched: true,
      error: 'This is an error',
      asyncValidating: false
    },
    handleChange: functionMock,
    handleBlur: functionMock,
    handleFocus: functionMock,
    value: 'jane@smith.me'
  };

  it('should render RenderInput component correctly', () => {
    const mountedWrapper = mount(<RenderInput {...cleanProps} />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('div.invalid-feedback').exists()).toBeFalsy();
    expect(mountedWrapper.find('input').hasClass('is-invalid')).toBeFalsy();
    mountedWrapper.unmount();
  });

  it('should render checkbox correctly', () => {
    const mountedWrapper = mount(<RenderInput {...cleanProps} type="checkbox" />);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('.form-input-checkbox')).toBeTruthy();
    mountedWrapper.unmount();
  });

  it('should show error when invalid data is inputted', () => {
    const mountedWrapper = mount(<RenderInput {...dirtyProps} />);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.find('.invalid-feedback').text()).toEqual('This is an error');
    expect(mountedWrapper.find('input').hasClass('is-invalid')).toBeTruthy();
    mountedWrapper.unmount();
  });

  it('should change field state to open when label is clicked on', () => {
    const mountedWrapper = mount(<RenderInput {...cleanProps} />);

    mountedWrapper.find('label').simulate('click');

    expect(mountedWrapper.state().openField).toEqual(true);
    mountedWrapper.unmount();
  });
});
