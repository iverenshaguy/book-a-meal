import sinon from 'sinon';
import webpackDev from '../../src/utils/webpackDev';

const app = { use: check => check };
const useSpy = sinon.spy(app, 'use');

describe('Webpack Dev Middleware', () => {
  it('doesn\'t call middleware in production', () => {
    webpackDev(app, 'production');

    sinon.assert.notCalled(useSpy);
  });

  it('doesn\'t call middleware in test', () => {
    webpackDev(app, 'test');

    sinon.assert.notCalled(useSpy);
  });

  it('calls middleware in development', () => {
    webpackDev(app, 'development');

    sinon.assert.called(useSpy);
  });
});
