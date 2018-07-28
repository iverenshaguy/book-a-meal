import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Meals from '../../../../src/components/pages/Meals/Meals';
import ConnectedMeals from '../../../../src/components/pages/Meals';
import { caterer, customer, caterersMealsObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialValues, meals: { ...initialValues.meals, items: caterersMealsObj.meals }
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

    const shallowWrapper = shallow(<Meals
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('calls toggleModal when button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(<Meals
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
    />);

    wrapper.find('#add-meal-btn').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('calls toggleModal when edit meal button is clicked', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedMeals
          user={caterer}
          logout={jest.fn()}
          fetchMeals={jest.fn()}
          {...caterersMealsObj}
          isFetching={false}
        />
      </Provider>
    );
    const wrapper = mount(comp, rrcMock.get());

    const toggleSpy = jest.spyOn(wrapper.find(Meals).instance(), 'toggleModal');

    wrapper.find('#edit-meal').at(0).simulate('click');
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('redirects User to homepage if user role is customer', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<Meals
      user={customer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...caterersMealsObj}
      isFetching
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
    />);

    expect(shallowWrapper.find('Redirect')).toBeTruthy();
  });

  it('renders Preloader when fetching', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<Meals
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      {...caterersMealsObj}
      isFetching
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and there are no meals', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<Meals
      user={caterer}
      logout={jest.fn()}
      fetchMeals={jest.fn()}
      meals={[]}
      isFetching
      submitting={false}
      uploading={false}
      toggleModal={toggleMock}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('You Do Not Have Any Meals Yet');
  });

  it('renders connected component', () => {
    const dispatchMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <ConnectedMeals
          user={caterer}
          dispatch={dispatchMock}
          {...caterersMealsObj}
          isFetching={false}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
