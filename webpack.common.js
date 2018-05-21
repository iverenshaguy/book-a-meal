const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin = new HtmlWebPackPlugin({
  title: 'Book A Meal',
  template: './client/src/index.html',
  filename: './client/dist/index.html'
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

const cleanerPlugin = new CleanWebpackPlugin('./client/dist', {});

const hotReloader = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: { app: ['react-hot-loader/patch', './client/src/index.js', 'webpack-hot-middleware/client'] },
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg?e|gif)/i,
        use: [
          'file-loader',
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
  plugins: [hotReloader, cleanerPlugin, htmlPlugin, cssPlugin]
};
