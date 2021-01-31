/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill';
import '@babel/register';
import path from 'path';

/**
 * Function to load Webpack Dev Middleware if environment is development
 * @param {object} app
 * @param {string} env
 * @return {middleware} returns middleware
 */
function webpackDev(app, env) {
  if (env === 'development' || env === 'e2e') {
    /* eslint-disable global-require, import/no-extraneous-dependencies */
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    // eslint-disable-next-line import/no-dynamic-require
    const webpackConfig = require(path.resolve(__dirname, '../../webpack.dev.babel'));
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      hot: true,
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    }));

    app.use(webpackHotMiddleware(compiler));
  }
}

export default webpackDev;
