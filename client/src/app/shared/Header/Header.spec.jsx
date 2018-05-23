import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HeaderComponent from './HeaderComponent';
import Header from '../Header';

import initialValues from '../../../../tests/setup/initialValues';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

describe('Header', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<HeaderComponent type="/" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders container correctly', () => {
    const shallowWrapper = shallow(<Provider store={store}><Header /></Provider>);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
