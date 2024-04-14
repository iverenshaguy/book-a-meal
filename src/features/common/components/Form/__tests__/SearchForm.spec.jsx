import React from 'react';
import SearchForm from 'src/features/common/components/Form/SearchForm';

describe('SearchForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the SearchForm component correctly when type prop is customer', () => {
    const wrapper = shallow(<SearchForm type="customer" fetchItems={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.search-btn').length).toEqual(1);
  });

  it('should render the SearchForm component correctly when type prop is caterer', () => {
    const wrapper = shallow(<SearchForm type="caterer" fetchItems={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.search-btn').length).toEqual(0);
  });

  it('should change the search state when search form in changed', () => {
    const wrapper = mount(<SearchForm type="caterer" fetchItems={jest.fn()} />);
    const event = { target: { value: 'Rice' } };

    wrapper.find('input[name="search"]').simulate('change', event);

    expect(wrapper.state().searchTerm).toEqual('Rice');
  });

  it('should call fetchItems 300 milliseconds after search form change', () => {
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
