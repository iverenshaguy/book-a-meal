/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import localStorageMock from 'src/config/tests/__mocks__/localStorageMock';

configure({ adapter: new Adapter() });

global.jest = jest;
global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.toJson = toJson;
global.rrcMock = new ReactRouterEnzymeContext();
process.env.OPENING_HOUR = 8;
process.env.OPENING_MINUTE = 30;
process.env.CLOSING_HOUR = 16;
process.env.CLOSING_MINUTE = 0;

window.localStorage = localStorageMock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  Redirect: () => null,
}));

jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  return moment.utc;
});
