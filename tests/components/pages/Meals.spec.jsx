import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MealsComponent from '../../../src/components/pages/Meals';
import MealsContainer from '../../../src/containers/pages/Meals';
import {
  caterer, mealsObj, initialState, metadata
} from '../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  meals: { ...initialState.meals, items: mealsObj.meals, metadata },
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
});
const { now } = Date;

describe('Meals', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render Meal component correctly when there are available meals', () => {
    const toggleMock = jest.fn();

    const shallowWrapper = shallow(<MealsComponent
      fetchMeals={jest.fn()}
      {...mealsObj}
      submitting={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('should start fetching meals when Meal component is loaded', () => {
    const toggleMock = jest.fn();
    const fetchMealsMock = jest.fn();

    shallow(<MealsComponent
      fetchMeals={fetchMealsMock}
      {...mealsObj}
      submitting={false}
      toggleModal={toggleMock}
      metadata={{}}
    />);

    expect(fetchMealsMock).toHaveBeenCalled();
  });

  it('should start fetching more meals when Meal Component triggers loadMoreMeals function', () => {
    const toggleMock = jest.fn();
    const fetchMealsMock = jest.fn();

    const shallowWrapper = shallow(<MealsComponent
      fetchMeals={fetchMealsMock}
      {...mealsObj}
      submitting={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    shallowWrapper.instance().loadMoreMeals();

    expect(fetchMealsMock).toHaveBeenCalledTimes(2);
  });

  it('should open meal modal when the "Add Meal" button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = shallow(<MealsComponent
      fetchMeals={jest.fn()}
      {...mealsObj}
      submitting={false}
      toggleModal={toggleMock}
      metadata={metadata}
    />);

    wrapper.find('#add-meal-btn').simulate('click');
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should open meal modal when the "Edit Meal" button is clicked', () => {
    const comp = (
      <Provider store={store}>
        <MealsContainer
          fetchMeals={jest.fn()}
          {...mealsObj}
          metadata={metadata}
        />
      </Provider>
    );
    const wrapper = mount(comp, rrcMock.get());

    const toggleMealModalSpy = jest.spyOn(wrapper.find(MealsComponent).instance(), 'toggleMealModal');

    wrapper.find('#edit-meal').at(0).simulate('click');
    expect(toggleMealModalSpy).toHaveBeenCalled();
  });

  it('should show "You Do Not Have Any Meals Yet" message when caterer does not have any meals available', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<MealsComponent
      fetchMeals={jest.fn()}
      meals={[]}
      submitting={false}
      toggleModal={toggleMock}
      metadata={{}}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('You Do Not Have Any Meals Yet');
  });

  it('should render Meal Component when it is connected to the redux store correctly', () => {
    const dispatchMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <MealsContainer
          dispatch={dispatchMock}
          {...mealsObj}
        />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
