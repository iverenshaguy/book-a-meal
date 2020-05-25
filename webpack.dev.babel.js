/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import merge from 'webpack-merge';

import common from './webpack.common.babel';

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const hotReloader = new webpack.HotModuleReplacementPlugin();
const envPlugin = new Dotenv();

export default merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: { app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './client/src/index.jsx'] },
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
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [envPlugin, cssPlugin, hotReloader]
});
