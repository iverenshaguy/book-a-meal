const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const hotReloader = new webpack.HotModuleReplacementPlugin();
const envPlugin = new Dotenv();

module.exports = merge(common, {
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
  plugins: [envPlugin, cssPlugin, hotReloader]
});
