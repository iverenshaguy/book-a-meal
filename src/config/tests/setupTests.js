/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import React from 'react';
import localStorageMock from 'src/config/tests/__mocks__/localStorageMock';

global.jest = jest;
global.React = React;
process.env.OPENING_HOUR = 8;
process.env.OPENING_MINUTE = 30;
process.env.CLOSING_HOUR = 16;
process.env.CLOSING_MINUTE = 0;

window.localStorage = localStorageMock;

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  Redirect: () => null,
  Navigate: () => null,
}));

jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  return moment.utc;
});
