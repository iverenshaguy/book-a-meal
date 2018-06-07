import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SigninComponent from './SigninComponent';
import Signin from './index';
import initialValues from '../../../../tests/setup/initialValues';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

describe('SigninComponent', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SigninComponent />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders connected component correctly', () => {
    const mountedWrapper = mount(<Provider store={store}><Signin /></Provider>);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
  });
});
