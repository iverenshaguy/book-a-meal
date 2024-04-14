/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin2');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');

const path = require('path');
const common = require('./webpack.common');

const cleanerPlugin = new CleanWebpackPlugin();

const momentLocalesPlugin = new MomentLocalesPlugin();

const compressionPlugin = new CompressionPlugin({
  algorithm: 'gzip',
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0.8,
});

const visualizerPlugin = new Visualizer({ filename: './statistics.html' });

dotenv.config({ path: '.env' });

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
    REACT_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  },
});

module.exports = merge(common, {
  mode: 'production',
  entry: {
    // app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', path.resolve(__dirname, './src/index.jsx')],
    app: path.resolve(__dirname, './src/index.jsx'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [cleanerPlugin, envPlugin, compressionPlugin, visualizerPlugin, momentLocalesPlugin],
});
