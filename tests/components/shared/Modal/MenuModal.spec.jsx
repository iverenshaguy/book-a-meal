import React from 'react';
import MenuModal from '../../../../src/components/shared/Modal/MenuModal';

describe('MenuModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render MenuModal component correctly', () => {
    const shallowWrapper = shallow(<MenuModal />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
