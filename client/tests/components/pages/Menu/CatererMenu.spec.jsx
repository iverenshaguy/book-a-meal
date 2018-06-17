import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CatererMenu from '../../../../src/components/pages/Menu/CatererMenu/CatererMenu';
import ConnectedCatererMenu from '../../../../src/components/pages/Menu/CatererMenu';
import { caterer, caterersMealsObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialValues, menu: { ...initialValues.menu, meals: caterersMealsObj.meals }
});
const { now } = Date;

describe('Menu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const toggleMock = jest.fn();

    const shallowWrapper = shallow(<CatererMenu
      user={caterer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('calls toggleModal when set meal button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(<CatererMenu
      user={caterer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
    />);

    wrapper.find('#menu-modal-btn').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('calls setCurrentDay when Change Date button is clicked', () => {
    const setCurrentDayMock = jest.fn();
    const wrapper = shallow(<CatererMenu
      user={caterer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
      submitting={false}
      setCurrentDay={setCurrentDayMock}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={jest.fn()}
    />);

    const event = { target: { value: moment().format('YYYY-MM-DD') } };

    wrapper.find('DatePicker').at(0).dive().find('input')
      .simulate('change', event);
    expect(setCurrentDayMock).toHaveBeenCalled();
  });

  it('renders Preloader when fetching', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<CatererMenu
      user={caterer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and there are no meals on the menu', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<CatererMenu
      user={caterer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      meals={[]}
      isFetching
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('There are no Meal Items on this Menu');
  });

  it('renders connected component', () => {
    const dispatchMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <ConnectedCatererMenu
          user={caterer}
          dispatch={dispatchMock}
          {...caterersMealsObj}
          isFetching={false}
        />
      </Provider>);

    const wrapper = mount(comp);

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('disbales button when time in state is before current time', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(<CatererMenu
      user={caterer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
    />);

    wrapper.setProps({
      currentDay: '1969-04-27'
    });

    expect(wrapper.find('#menu-modal-btn').props('disabled')).toBeTruthy();
  });
});
