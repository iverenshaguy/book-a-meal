import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import localStorageMock from './__mocks__/localStorageMock';

configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.toJson = toJson;
global.rrcMock = new ReactRouterEnzymeContext();

window.localStorage = localStorageMock;
