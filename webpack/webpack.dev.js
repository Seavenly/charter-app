const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ReactHotLoader = require('react-hot-loader/babel');

const common = require('./webpack.common');

const rootDir = path.resolve(__dirname, '../');

module.exports = merge.smart(common, {
  entry: ['react-hot-loader/patch', `${rootDir}/src/index.tsx`],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `${rootDir}/dist`,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader', options: { plugins: [ReactHotLoader] } },
          'awesome-typescript-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
