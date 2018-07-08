import React from 'react';
import OrderSuccessModal from '../../../../src/components/shared/Modal/OrderSuccessModal';

describe('OrderSuccessModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<OrderSuccessModal />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p.text-center').text()).toEqual('Thank you for your order. Your belly will be filled up shortly');
  });
});
