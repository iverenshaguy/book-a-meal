/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

/**
 * Function to load Webpack Dev Middleware is environment is development
 * @param {object} app
 * @param {string} env
 * @return {middleware} returns middleware
 */
function webpackDev(app, env) {
  if (env === 'development' || env === 'test') {
    /* eslint-disable global-require */
    const webpackConfig = require('../../../webpack.dev.babel');
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
