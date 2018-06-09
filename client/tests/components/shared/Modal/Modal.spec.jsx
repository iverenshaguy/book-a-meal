import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialValues } from '../../../setup/data';
import Modal from '../../../../src/app/shared/Modal/Modal';
import ConnectedModal from '../../../../src/app/shared/Modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

describe('Modal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<Modal type="addMeal" open toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('#modal-title-h3').text()).toEqual('Add a Meal');
    expect(shallowWrapper.find('MealModal')).toBeTruthy();
  });

  it('does not correctly when modal is closed', () => {
    const shallowWrapper = shallow(<Modal type="addMeal" open={false} toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.text()).toEqual('');
  });

  it('renders correctly when type is newMealImage', () => {
    const shallowWrapper = shallow(<Modal type="newMealImage" open toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('#modal-title-h3').text()).toEqual('Add a Meal Image');
    expect(shallowWrapper.find('MealImageModal')).toBeTruthy();

    shallowWrapper.find('#modal-close-icon').simulate('click');
  });

  it('renders null when type is unknown', () => {
    const shallowWrapper = shallow(<Modal type="unknown" open toggleModal={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('calls toggleModal function prop when close modal icon is clicked', () => {
    const toggleMock = jest.fn();
    const shallowWrapper = shallow(<Modal type="addMeal" open toggleModal={toggleMock} />);

    shallowWrapper.find('Link#modal-close-icon').dive('button').simulate('click');

    expect(toggleMock).toHaveBeenCalled();
  });

  it('renders connected component correctly', () => {
    const comp = (<Provider store={store}><ConnectedModal type="addMeal" open toggleModal={jest.fn()} /></Provider>);
    const mountedWrapper = mount(comp);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });
});
