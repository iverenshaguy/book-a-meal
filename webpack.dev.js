const webpack = require('webpack');
const path = require('path');
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

const hotReloader = new webpack.HotModuleReplacementPlugin();
const envPlugin = new Dotenv();

module.exports = {
  entry: { app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './client/src/index.jsx'] },
  devServer: {
    contentBase: './client/dist',
    hot: true
  },
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
          'style-loader',
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
  plugins: [envPlugin, htmlPlugin, cssPlugin, hotReloader]
};
