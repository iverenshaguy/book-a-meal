import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../../webpack.dev';

const compiler = webpack(webpackConfig);

/**
 * Function to load Webpack Dev Middleware is environment is development
 * @param {object} app
 * @param {string} env
 * @return {middleware} returns middleware
 */
function webpackDev(app, env) {
  if (env === 'development') {
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
    }));

    app.use(webpackHotMiddleware(compiler));
  }
}

export default webpackDev;
