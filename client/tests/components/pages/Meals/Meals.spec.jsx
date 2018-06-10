import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Meals from '../../../../src/app/pages/Meals/Meals';
import ConnectedMeals from '../../../../src/app/pages/Meals';
import { caterer, caterersMealsObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialValues, meals: { ...initialValues.meals, items: caterersMealsObj.meals }
});


describe('Meals', () => {
  it('renders correctly when not fetching', () => {
    const toggleMock = jest.fn();
    const { now } = Date;
    Date.now = jest.fn(() => 0); // mock Date now

    try {
      const shallowWrapper = shallow(<Meals
        user={caterer}
        logout={jest.fn()}
        fetchMeals={jest.fn()}
        {...caterersMealsObj}
        isFetching={false}
        submitting={false}
        toggleModal={toggleMock}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('MealCard')).toBeTruthy();
    } finally {
      Date.now = now; // restore original now method on Date object
    }
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
    const wrapper = mount(comp);

    const toggleSpy = jest.spyOn(wrapper.find(Meals).instance(), 'toggleModal');

    wrapper.find('#edit-meal').at(0).simulate('click');
    expect(toggleSpy).toHaveBeenCalled();
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
      toggleModal={toggleMock}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders connected component', () => {
    const dispatchMock = jest.fn();
    const { now } = Date;
    Date.now = jest.fn(() => 0); // mock Date now

    try {
      const comp = (
        <Provider store={store}>
          <ConnectedMeals
            user={caterer}
            dispatch={dispatchMock}
            {...caterersMealsObj}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp);

      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    } finally {
      Date.now = now; // restore original now method on Date object
    }
  });
});
