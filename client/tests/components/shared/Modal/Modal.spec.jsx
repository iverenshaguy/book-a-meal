import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../setup/mockData';
import ModalComponent from '../../../../src/components/shared/Modal';
import ModalContainer from '../../../../src/containers/shared/Modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

describe('Modal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<ModalComponent type="addMeal" open submitting={false} toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('#modal-title-h3').text()).toEqual('Add a Meal');
    expect(shallowWrapper.find('MealModal')).toBeTruthy();
  });

  it('does not correctly when modal is closed', () => {
    const shallowWrapper = shallow(<ModalComponent type="addMeal" open={false} submitting={false} toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.text()).toEqual('');
  });

  it('renders correctly when type is editMeal', () => {
    const shallowWrapper = shallow(<ModalComponent type="editMeal" open submitting={false} toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('#modal-title-h3').text()).toEqual('Edit Meal');
    expect(shallowWrapper.find('MealModal')).toBeTruthy();
  });

  it('renders correctly when type is deleteMeal', () => {
    const shallowWrapper = shallow(<ModalComponent type="deleteMeal" open submitting={false} toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('#modal-title-h3').text()).toEqual('Delete Meal');
    expect(shallowWrapper.find('DeleteMealModal')).toBeTruthy();
  });

  it('renders correctly when type is deleteSuccessMsg', () => {
    const shallowWrapper = shallow(<ModalComponent type="deleteSuccessMsg" open toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('#modal-title-h3').text()).toEqual('Delete Meal');
    expect(shallowWrapper.find('p.text-center').text()).toEqual('Meal Deleted Successfully');
  });

  it('renders correctly when type is orderSuccessMsg', () => {
    const shallowWrapper = shallow(<ModalComponent type="orderSuccessMsg" open toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p.text-center').text()).toEqual('Thank you for your order. Your belly will be filled up shortly');
  });

  it('renders correctly when type is orderCanceledMsg', () => {
    const shallowWrapper = shallow(<ModalComponent type="orderCanceledMsg" open toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p.text-center').text()).toEqual('Order Canceled Successfully');
  });

  it('renders correctly when type is menu', () => {
    const shallowWrapper = shallow(<ModalComponent type="menu" open submitting={false} toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('#modal-title-h3').text()).toEqual('Select Meal Options');
    expect(shallowWrapper.find('MenuModal')).toBeTruthy();
  });

  it('renders null when type is unknown', () => {
    const shallowWrapper = shallow(<ModalComponent type="unknown" open toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('calls toggleModal function prop when close modal icon is clicked', () => {
    const toggleMock = jest.fn();
    const comp = (<ModalComponent store={store} type="unknown" open submitting={false} toggleModal={toggleMock} />);
    const wrapper = mount(comp);

    wrapper.find('button.link-btn').simulate('click');

    expect(toggleMock).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('renders connected component correctly', () => {
    const comp = (<Provider store={store}><ModalContainer type="addMeal" open toggleModal={jest.fn()} /></Provider>);
    const mountedWrapper = mount(comp);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });
});
