/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'Book A Meal',
  template: path.resolve(__dirname, './src/index.html'),
  filename: 'index.html',
  scriptLoading: 'defer',
});

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
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
              cacheDirectory: true,
              cacheCompression: false,
              rootMode: 'upward',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-transform-object-rest-spread',
                '@babel/plugin-transform-export-namespace-from',
                '@babel/plugin-transform-class-properties',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-throw-expressions',
                '@babel/plugin-transform-runtime',
                'react-hot-loader/babel',
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    },
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'public'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [htmlPlugin],
};
