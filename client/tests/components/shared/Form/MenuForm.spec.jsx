import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialValues, caterersMealsObj } from '../../../setup/data';
import MenuForm from '../../../../src/components/shared/Form/MenuForm/MenuForm';
import ConnectedMenuForm from '../../../../src/components/shared/Form/MenuForm/';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

const props = {
  meals: caterersMealsObj.meals,
  menu: {
    date: '2018-06-16',
    meals: caterersMealsObj.meals,
  },
  isFetching: false,
  fetchMeals: jest.fn(),
  fetchMenu: jest.fn(),
  clearMenuError: jest.fn(),
  addMenu: jest.fn(),
  submitting: false,
  submitError: null
};

describe('MenuForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<MenuForm {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    const wrapper = shallow(<MenuForm {...props} isFetching />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when submitting', () => {
    const wrapper = shallow(<MenuForm {...props} submitting />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when there is a submit error', () => {
    const wrapper = shallow(<MenuForm {...props} submitError="Error" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when there are no meals', () => {
    const wrapper = shallow(<MenuForm {...props} meals={[]} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('adds meal to state on meal select', () => {
    const wrapper = mount(<MenuForm {...props} />);
    const event = { target: { name: '81211c24-51c0-46ec-b1e0-18db55880958', type: 'checkbox', checked: false } };

    wrapper.find('input').at(1).simulate('change', event);

    const mealAvailInState = wrapper.state().meals.findIndex(meal => meal === '81211c24-51c0-46ec-b1e0-18db55880958');

    expect(mealAvailInState).toEqual(-1);
  });

  it('removes meal from state on meal select', () => {
    const wrapper = mount(<MenuForm {...props} />);
    const falseEvent = { target: { name: '81211c24-51c0-46ec-b1e0-18db55880958', type: 'checkbox', checked: false } };
    const trueEvent = { target: { name: '81211c24-51c0-46ec-b1e0-18db55880958', type: 'checkbox', checked: true } };
    const mealAvailInState = wrapper.state().meals.findIndex(meal => meal === '81211c24-51c0-46ec-b1e0-18db55880958');

    wrapper.find('input').at(1).simulate('change', falseEvent);
    wrapper.find('input').at(1).simulate('change', trueEvent);

    expect(mealAvailInState).toEqual(0);
  });

  it('changes date state on date change', () => {
    const wrapper = mount(<MenuForm {...props} />);
    const event = { target: { value: '2018-04-27' } };

    wrapper.find('input').at(0).simulate('change', event);

    expect(wrapper.state().date).toEqual('2018-04-27');
  });

  it('submits Menu Form', () => {
    const addMenuMock = jest.fn();
    const wrapper = mount(<MenuForm {...props} addMenu={addMenuMock} />);

    wrapper.find('button').simulate('click');

    expect(addMenuMock).toHaveBeenCalled();
  });

  it('renders connected component correctly', () => {
    const wrapper = mount(<Provider store={store}><ConnectedMenuForm {...props} /></Provider>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
