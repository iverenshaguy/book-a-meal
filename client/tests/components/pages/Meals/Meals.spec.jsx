import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MealsComponent from '../../../../src/components/pages/Meals';
import MealsContainer from '../../../../src/containers/pages/Meals';
import { caterer, customer, mealsObj, initialState, metadata } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState, meals: { ...initialState.meals, items: mealsObj.meals, metadata }
});
const { now } = Date;

describe('Meals', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const toggleMock = jest.fn();

    const shallowWrapper = shallow(<MealsComponent
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...mealsObj}
      isFetching={false}
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('does not call fetchMeals on component mount when metadata is not available', () => {
    const toggleMock = jest.fn();
    const fetchMealsMock = jest.fn();

    shallow(<MealsComponent
      user={caterer}
      logout={jest.fn()}
      fetchMeals={fetchMealsMock}
      {...mealsObj}
      isFetching={false}
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(fetchMealsMock).not.toHaveBeenCalled();
  });

  it('calls fetchMeals on component mount when metadata is available', () => {
    const toggleMock = jest.fn();
    const fetchMealsMock = jest.fn();

    shallow(<MealsComponent
      user={caterer}
      logout={jest.fn()}
      fetchMeals={fetchMealsMock}
      {...mealsObj}
      isFetching={false}
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={{}}
    />);

    expect(fetchMealsMock).toHaveBeenCalled();
  });

  it('calls fetchMeals when loadMoreMeals is called', () => {
    const toggleMock = jest.fn();
    const fetchMealsMock = jest.fn();

    const shallowWrapper = shallow(<MealsComponent
      user={caterer}
      logout={jest.fn()}
      fetchMeals={fetchMealsMock}
      {...mealsObj}
      isFetching={false}
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={{}}
    />);

    shallowWrapper.instance().loadMoreMeals();

    expect(fetchMealsMock).toHaveBeenCalledTimes(2);
  });

  it('calls toggleModal when button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(<MealsComponent
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...mealsObj}
      isFetching={false}
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    wrapper.find('#add-meal-btn').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('calls toggleModal when edit meal button is clicked', () => {
    const comp = (
      <Provider store={store}>
        <MealsContainer
          user={caterer}
          logout={jest.fn()}
          fetchMeals={jest.fn()}
          {...mealsObj}
          isFetching={false}
        />
      </Provider>
    );
    const wrapper = mount(comp, rrcMock.get());

    const toggleSpy = jest.spyOn(wrapper.find(MealsComponent).instance(), 'toggleModal');

    wrapper.find('#edit-meal').at(0).simulate('click');
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('redirects User to homepage if user role is customer', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<MealsComponent
      user={customer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...mealsObj}
      isFetching
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(shallowWrapper.find('Redirect')).toBeTruthy();
  });

  it('renders Preloader when fetching', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<MealsComponent
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...mealsObj}
      isFetching
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and there are no meals', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<MealsComponent
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      meals={[]}
      isFetching
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('You Do Not Have Any Meals Yet');
  });

  it('renders connected component', () => {
    const dispatchMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <MealsContainer
          user={caterer}
          dispatch={dispatchMock}
          {...mealsObj}
          isFetching={false}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
