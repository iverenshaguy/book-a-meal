/* eslint-disable */
import sinon from 'sinon';
import nodemailer from 'nodemailer';

const sandbox = sinon.createSandbox();
const transport = {
  sendMail: data => data
};

sandbox.stub(nodemailer, 'createTransport').returns(transport);

import './helpers';
import './middlewares';
import './routes';
import './utils/webpackDev.test';
import './utils/Pagination.test';
