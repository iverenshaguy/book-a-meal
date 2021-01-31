/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.babel');

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const hotReloader = new webpack.HotModuleReplacementPlugin();
const envPlugin = new Dotenv({ path: path.resolve(__dirname, '.env') });

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: '/public',
    compress: true,
    port: 3000,
    open: true,
    allowedHosts: ['localhost'],
    historyApiFallback: true,
  },
  entry: { app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', path.resolve(__dirname, './src/index.jsx')] },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    }
  },
  plugins: [envPlugin, cssPlugin, hotReloader]
});
