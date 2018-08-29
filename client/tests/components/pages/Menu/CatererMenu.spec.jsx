import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CatererMenuComponent from '../../../../src/components/pages/Menu/CatererMenu';
import CatererMenuContainer from '../../../../src/containers/pages/Menu/CatererMenu';
import { caterer, mealsObj, initialState, metadata } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  menu: { ...initialState.menu, meals: mealsObj.meals },
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
});
const { now } = Date;

describe('CatererMenu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const toggleMock = jest.fn();

    const shallowWrapper = shallow(<CatererMenuComponent
      user={caterer}
      fetchMenu={jest.fn()}
      {...mealsObj}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('calls fetchMenu when loadMoreMenu is called', () => {
    const toggleMock = jest.fn();
    const fetchMenuMock = jest.fn();

    const shallowWrapper = shallow(<CatererMenuComponent
      user={caterer}
      fetchMenu={fetchMenuMock}
      {...mealsObj}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    shallowWrapper.instance().loadMoreMenu();

    expect(fetchMenuMock).toHaveBeenCalledTimes(2);
  });

  it('calls toggleModal when set meal button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(<CatererMenuComponent
      user={caterer}
      fetchMenu={jest.fn()}
      {...mealsObj}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    wrapper.find('#menu-modal-btn').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('calls setCurrentDay when Change Date button is clicked', () => {
    const setCurrentDayMock = jest.fn();
    const wrapper = shallow(<CatererMenuComponent
      user={caterer}
      fetchMenu={jest.fn()}
      {...mealsObj}
      submitting={false}
      setCurrentDay={setCurrentDayMock}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={jest.fn()}
      metadata={metadata}
    />);

    const event = { target: { value: moment().format('YYYY-MM-DD') } };

    wrapper.find('DatePicker').at(0).dive().find('input')
      .simulate('change', event);
    expect(setCurrentDayMock).toHaveBeenCalled();
  });

  it('renders Preloader when fetching', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<CatererMenuComponent
      user={caterer}
      fetchMenu={jest.fn()}
      {...mealsObj}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when there are no meals on the menu', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<CatererMenuComponent
      user={caterer}
      fetchMenu={jest.fn()}
      meals={[]}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('There are no Meal Items on this Menu');
  });

  it('renders connected component', () => {
    const comp = (
      <Provider store={store}>
        <CatererMenuContainer
          user={caterer}
          {...mealsObj}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('disbales button when time in state is before current time', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(<CatererMenuComponent
      user={caterer}
      fetchMenu={jest.fn()}
      {...mealsObj}
      submitting={false}
      setCurrentDay={jest.fn()}
      currentDay={moment().format('YYYY-MM-DD')}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    wrapper.setProps({
      currentDay: '1969-04-27'
    });

    expect(wrapper.find('#menu-modal-btn').length).toBeFalsy();
  });
});
