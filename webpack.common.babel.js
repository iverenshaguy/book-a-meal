/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'Book A Meal',
  template: path.resolve(__dirname, './src/index.html'),
  filename: 'index.html'
});

const scriptExtHtmlPlugin = new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: 'defer'
});

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  }
                ]
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-throw-expressions',
                '@babel/plugin-transform-runtime',
                'react-hot-loader/babel',
                'add-module-exports'
              ],
            }
          }
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
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
    htmlPlugin,
    scriptExtHtmlPlugin
  ]
};
