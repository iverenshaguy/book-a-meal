/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  configure,
  shallow,
  mount,
  render
} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import localStorageMock from './__mocks__/localStorageMock';
import mocksdk from './__mocks__/firebaseMock';

configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.toJson = toJson;
global.mocksdk = mocksdk;
global.rrcMock = new ReactRouterEnzymeContext();
process.env.OPENING_HOUR = 8;
process.env.OPENING_MINUTE = 30;
process.env.CLOSING_HOUR = 16;
process.env.CLOSING_MINUTE = 0;

window.localStorage = localStorageMock;

jest.mock('moment', () => {
  const moment = require.requireActual('moment');
  return moment.utc;
});

jest.mock('../src/config/firebase.js', () => mocksdk);
