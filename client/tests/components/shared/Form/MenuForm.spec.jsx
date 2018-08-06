import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialValues, caterersMealsObj, metadata } from '../../../setup/data';
import MenuForm from '../../../../src/components/shared/Form/MenuForm/MenuForm';
import ConnectedMenuForm from '../../../../src/components/shared/Form/MenuForm/';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

const props = {
  meals: caterersMealsObj.meals,
  menu: {
    id: '1234',
    date: '2018-06-16',
    meals: caterersMealsObj.meals,
  },
  isFetching: false,
  fetchMeals: jest.fn(),
  fetchMenu: jest.fn(),
  clearMenuError: jest.fn(),
  addMenu: jest.fn(),
  editMenu: jest.fn(),
  submitting: false,
  submitError: null,
  menuMetadata: metadata,
  mealsMetadata: metadata
};

const { now } = Date;

describe('MenuForm', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    jest.clearAllMocks();
    Date.now = now;
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

  it('renders correctly when there is a date error', () => {
    const errorObj = { date: { value: 'Error' } };
    const wrapper = shallow(<MenuForm {...props} submitError={errorObj} />);

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
    // Date.now() =
    const wrapper = mount(<MenuForm {...props} />);
    const event = { target: { value: '2018-04-27' } };

    wrapper.find('input').at(0).simulate('change', event);

    expect(wrapper.state().date).toEqual('2018-04-27');
  });

  it('does not changes date state on date change when date is lower than current date', () => {
    const wrapper = mount(<MenuForm {...props} />);
    const event = { target: { value: '1969-01-01' } };

    wrapper.find('input').at(0).simulate('change', event);

    expect(wrapper.state().date).toEqual('1970-01-01');
  });

  it('submits Menu Form when adding menu', () => {
    const menu = { id: null, date: '2018-06-16', meals: [] };
    const addMenuMock = jest.fn();
    const wrapper = mount(<MenuForm {...props} menu={menu} addMenu={addMenuMock} />);

    wrapper.setState({ meals: caterersMealsObj.meals });

    wrapper.find('button').simulate('click');

    expect(addMenuMock).toHaveBeenCalled();
  });

  it('submits Menu Form when editing', () => {
    const editMenuMock = jest.fn();
    const wrapper = mount(<MenuForm {...props} editMenu={editMenuMock} />);

    wrapper.find('button').simulate('click');

    expect(editMenuMock).toHaveBeenCalled();
  });

  it('does not submit Menu Form when meal state is empty', () => {
    const menu = { id: null, date: '2018-06-16', meals: [] };
    const addMenuMock = jest.fn();
    const wrapper = mount(<MenuForm {...props} menu={menu} addMenu={addMenuMock} />);

    wrapper.find('button').simulate('click');

    expect(addMenuMock).not.toHaveBeenCalled();
    expect(wrapper.find('p.danger')).toBeTruthy();
  });

  it('renders connected component correctly', () => {
    const wrapper = mount(<Provider store={store}><ConnectedMenuForm {...props} /></Provider>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls fetchMeals when fetchMoreData is called and meals metadata has next url', () => {
    const fetchMealsMock = jest.fn();

    const wrapper = mount(<MenuForm
      {...props}
      fetchMeals={fetchMealsMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMealsMock).toHaveBeenCalledTimes(2);
  });

  it('doesnt call fetchMeals again when fetchMoreData is called and meals metadata does not have next url', () => {
    const fetchMealsMock = jest.fn();

    const wrapper = mount(<MenuForm
      {...props}
      mealsMetadata={{}}
      fetchMeals={fetchMealsMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMealsMock).toHaveBeenCalledTimes(1);
  });

  it('calls fetchMenu when fetchMoreData is called and menu metadata has next url', () => {
    const fetchMenuMock = jest.fn();

    const wrapper = mount(<MenuForm
      {...props}
      fetchMenu={fetchMenuMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMenuMock).toHaveBeenCalledTimes(2);
  });

  it('does not call fetchMenu again when fetchMoreData is called and menu metadata does not have next url', () => {
    const fetchMenuMock = jest.fn();

    const wrapper = mount(<MenuForm
      {...props}
      menuMetadata={{}}
      fetchMenu={fetchMenuMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMenuMock).toHaveBeenCalledTimes(1);
  });
});
