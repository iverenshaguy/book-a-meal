/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const envPlugin = new Dotenv({ path: path.resolve(__dirname, '.env') });

const certDir = path.join(__dirname, 'certs');
const certKey = path.join(certDir, 'server.key');
const certCert = path.join(certDir, 'server.crt');
const useHttps = fs.existsSync(certKey) && fs.existsSync(certCert);

const devServerConfig = {
  static: {
    directory: path.join(__dirname, 'public'),
  },
  hot: true,
  compress: true,
  port: 3000,
  open: useHttps ? 'https://book-a-meal.local:3000' : true,
  allowedHosts: ['localhost', 'book-a-meal.local', 'api.book-a-meal.local'],
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'https://api.book-a-meal.local/api/v1',
      pathRewrite: { '^/api': '' },
      secure: false,
      changeOrigin: true,
    },
  },
};

if (useHttps) {
  devServerConfig.https = {
    key: fs.readFileSync(certKey),
    cert: fs.readFileSync(certCert),
  };
  devServerConfig.server = 'https';
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: devServerConfig,
  entry: {
    // app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', path.resolve(__dirname, './src/index.jsx')],
    app: path.resolve(__dirname, './src/index.jsx'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: ['legacy-js-api', 'import'],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [envPlugin, cssPlugin],
});
