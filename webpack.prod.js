const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const htmlPlugin = new HtmlWebPackPlugin({
  title: 'Book A Meal',
  template: 'client/src/index.html',
  filename: 'index.html'
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const envPlugin = new Dotenv();
const uglifyPlugin = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true
});

const optimizeCSSPlugin = new OptimizeCSSAssetsPlugin({});

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
});

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/src/index.jsx')
  ],
  mode: 'production',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './img/[name].[ext]',
              limit: 10000
            }
          },
          'img-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  plugins: [
    definePlugin, envPlugin, htmlPlugin,
    cssPlugin, uglifyPlugin, optimizeCSSPlugin
  ]
};
