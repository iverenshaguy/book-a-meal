import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState, mealsObj } from '../../../setup/mockData';
import DeleteMealModalComponent from '../../../../src/components/shared/Modal/DeleteMealModal';
import DeleteMealModalContainer from '../../../../src/containers/shared/Modal/DeleteMealModal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  ...initialState,
  meals: { ...initialState.meals, items: mealsObj.meals }
});
const props = {
  editMeal: jest.fn(),
  deleteMeal: jest.fn(),
  toggleModal: jest.fn(),
  deleting: false,
  meal: mealsObj.meals[1]
};

describe('DeleteMealModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<DeleteMealModalComponent {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.delete-meal').length).toEqual(1);
    expect(wrapper.find('MiniPreloader').length).toBeFalsy();
  });

  it('renders MiniPreloader when deleting', () => {
    const wrapper = shallow(<DeleteMealModalComponent {...props} deleting />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('MiniPreloader').length).toEqual(1);
    expect(wrapper.find('.delete-meal').length).toBeFalsy();
  });

  it('renders connected component correctly', () => {
    const comp = (<Provider store={store}><DeleteMealModalContainer {...props} /></Provider>);
    const wrapper = mount(comp);

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('calls toggleModal', () => {
    const toggleModalMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <DeleteMealModalComponent {...props} toggleModal={toggleModalMock} />
      </Provider>
    );
    const wrapper = mount(comp);

    wrapper.find('#confirm-delete-no').simulate('click');

    expect(toggleModalMock).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('calls handleDeleteClick', () => {
    const deleteMealMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <DeleteMealModalComponent {...props} deleteMeal={deleteMealMock} />
      </Provider>
    );
    const wrapper = mount(comp);

    wrapper.find('#confirm-delete-yes').simulate('click');

    expect(deleteMealMock).toHaveBeenCalled();
    wrapper.unmount();
  });
});
