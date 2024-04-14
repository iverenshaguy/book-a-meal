import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import WrappedCatererMenu, { CatererMenu } from 'src/features/menu/caterer/CatererMenu';
import { caterer, mealsObj, initialState, metadata } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  menu: { ...initialState.menu, meals: mealsObj.meals },
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
});
const { now } = Date;

describe('CatererMenu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render CatererMenu component correctly and show Meal Cards', () => {
    const toggleMock = jest.fn();

    const shallowWrapper = shallow(
      <CatererMenu
        user={caterer}
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('should start fetching more caterer items when CatererMenu Component triggers loadMoreMenu function', () => {
    const toggleMock = jest.fn();
    const fetchMenuMock = jest.fn();

    const shallowWrapper = shallow(
      <CatererMenu
        user={caterer}
        fetchMenu={fetchMenuMock}
        {...mealsObj}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );

    shallowWrapper.instance().loadMoreMenu();

    expect(fetchMenuMock).toHaveBeenCalledTimes(2);
  });

  it('should open CatererMenu modal when "Set Menu" button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(
      <CatererMenu
        user={caterer}
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );

    wrapper.find('#menu-modal-btn').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should call setCurrentDay function to set the current day when "Change Date" button is clicked', () => {
    const setCurrentDayMock = jest.fn();
    const wrapper = shallow(
      <CatererMenu
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={setCurrentDayMock}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={jest.fn()}
        metadata={metadata}
      />
    );

    const event = { target: { value: moment().format('YYYY-MM-DD') } };

    wrapper.find('DatePicker').at(0).dive().find('input').simulate('change', event);
    expect(setCurrentDayMock).toHaveBeenCalled();
  });

  it('should render message when there are no caterer on the caterer', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(
      <CatererMenu
        fetchMenu={jest.fn()}
        meals={[]}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('There are no Meal Items on this Menu');
  });

  it('should not show "Set Menu" button when the time is changed to a time that is before the current time', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(
      <CatererMenu
        fetchMenu={jest.fn()}
        {...mealsObj}
        submitting={false}
        setCurrentDay={jest.fn()}
        currentDay={moment().format('YYYY-MM-DD')}
        toggleModal={toggleMock}
        metadata={metadata}
      />
    );

    wrapper.setProps({
      currentDay: '1969-04-27',
    });

    expect(wrapper.find('#menu-modal-btn').length).toBeFalsy();
  });

  it('should render CatererMenu Component when it is connected to the redux store', () => {
    const comp = (
      <Provider store={store}>
        <WrappedCatererMenu {...mealsObj} />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
