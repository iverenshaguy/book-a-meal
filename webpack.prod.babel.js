/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import dotenv from 'dotenv';
import merge from 'webpack-merge';

import common from './webpack.common.babel';

const cleanerPlugin = new CleanWebpackPlugin();
const optimizeCSSPlugin = new OptimizeCssAssetsPlugin({});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});

const terserPlugin = new TerserPlugin({
  cache: true,
  parallel: true,
  sourceMap: true // set to true if you want JS source maps
});

const compressionPlugin = new CompressionPlugin({
  algorithm: 'gzip',
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0.8
});

const visualizerPlugin = new Visualizer({ filename: './statistics.html' });

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

export default merge(common, {
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
  optimization: {
    minimizer: [terserPlugin],
  },
  plugins: [
    cleanerPlugin,
    envPlugin,
    cssPlugin,
    optimizeCSSPlugin,
    compressionPlugin,
    visualizerPlugin
  ],
});
