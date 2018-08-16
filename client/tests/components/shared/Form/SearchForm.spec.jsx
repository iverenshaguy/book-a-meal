import React from 'react';
import SearchForm from '../../../../src/components/shared/Form/SearchForm';

describe('SearchForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when type is customer', () => {
    const wrapper = shallow(<SearchForm type="customer" fetchItems={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.search-btn').length).toEqual(1);
  });

  it('renders correctly when type is caterer', () => {
    const wrapper = shallow(<SearchForm type="caterer" fetchItems={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.search-btn').length).toEqual(0);
  });

  it('changes search state when search form in changed', () => {
    const wrapper = mount(<SearchForm type="caterer" fetchItems={jest.fn()} />);
    const event = { target: { value: 'Rice' } };

    wrapper.find('input[name="search"]').simulate('change', event);

    expect(wrapper.state().searchTerm).toEqual('Rice');
  });

  it('calls setTimeout after search form change', () => {
    jest.useFakeTimers();

    const wrapper = mount(<SearchForm type="caterer" fetchItems={jest.fn()} />);
    const event = { target: { value: 'Rice' } };

    wrapper.setState({ typingTimeout: 123 });

    wrapper.find('input[name="search"]').simulate('change', event);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);
  });


  it('calls clearTimeout if typingTimeout is more than zero', () => {
    jest.useFakeTimers();

    const wrapper = mount(<SearchForm type="caterer" fetchItems={jest.fn()} />);
    const event = { target: { value: 'Rice' } };

    wrapper.setState({ typingTimeout: 123 });

    wrapper.find('input[name="search"]').simulate('change', event);

    expect(clearTimeout).toHaveBeenCalledWith(123);
  });

  it('calls fetchItems 300 milliseconds after search form change', () => {
    jest.useFakeTimers();

    const fetchItemsMock = jest.fn();
    const wrapper = mount(<SearchForm type="caterer" fetchItems={fetchItemsMock} />);
    const event = { target: { value: 'Rice' } };

    wrapper.setState({ typingTimeout: 123 });

    wrapper.find('input[name="search"]').simulate('change', event);

    jest.runAllTimers();

    expect(fetchItemsMock).toHaveBeenCalledTimes(1);
  });
});
