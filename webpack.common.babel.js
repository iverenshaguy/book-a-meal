/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'Book A Meal',
  template: 'client/src/index.html',
  filename: 'index.html'
});

const scriptExtHtmlPlugin = new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: 'defer'
});

export default {
  output: {
    path: path.resolve(__dirname, './client/dist'),
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
              presets: ['@babel/preset-env'],
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
    extensions: ['.js', '.json', '.jsx']
  },
  plugins: [
    htmlPlugin,
    scriptExtHtmlPlugin
  ]
};
