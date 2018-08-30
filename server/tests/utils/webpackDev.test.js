import sinon from 'sinon';
import webpackDev from '../../src/utils/webpackDev';

const app = { use: check => check };
const useSpy = sinon.spy(app, 'use');

describe('Webpack Dev Middleware', () => {
  it('should not call middleware in production', () => {
    webpackDev(app, 'production');

    sinon.assert.notCalled(useSpy);
  });

  it('should not call middleware in test', () => {
    webpackDev(app, 'test');

    sinon.assert.notCalled(useSpy);
  });

  it('should call middleware in development', () => {
    webpackDev(app, 'development');

    sinon.assert.called(useSpy);
  });
});
