const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  configFile: path.resolve(__dirname, '../../../babel.config.json')
});

/**
 * Mock WebpackDevConfig by writing a fake module to require cache
 *
 * https://medium.com/@minaluke/how-to-stub-spy-a-default-exported-function-a2dc1b580a6b
 */
require.cache[require.resolve('../../client/webpack.dev.babel')] = {
  exports: {
    output: {
      publicPath: '/'
    },
  },
};
