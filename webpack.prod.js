const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const cleanerPlugin = new CleanWebpackPlugin('./client/dist', {});
const optimizeCSSPlugin = new OptimizeCSSAssetsPlugin({});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});

const uglifyPlugin = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true // set to true if you want JS source maps
});

const compressionPlugin = new CompressionPlugin({
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0.8
});

dotenv.config();

const envPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    OPENING_HOUR: JSON.stringify(process.env.OPENING_HOUR),
    OPENING_MINUTE: JSON.stringify(process.env.OPENING_MINUTE),
    CLOSING_HOUR: JSON.stringify(process.env.CLOSING_HOUR),
    CLOSING_MINUTE: JSON.stringify(process.env.CLOSING_MINUTE),
    REACT_APP_FIREBASE_API_KEY: JSON.stringify(process.env.REACT_APP_FIREBASE_API_KEY),
    REACT_APP_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
    REACT_APP_FIREBASE_DB_URL: JSON.stringify(process.env.REACT_APP_FIREBASE_DB_URL),
    REACT_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET)
  }
});

module.exports = merge(common, {
  mode: 'production',
  entry: ['./client/src/index.jsx'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    cleanerPlugin,
    envPlugin,
    cssPlugin,
    uglifyPlugin,
    optimizeCSSPlugin,
    compressionPlugin
  ],
});
