const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '../');

module.exports = {
  output: {
    path: `${rootDir}/dist`,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@src': `${rootDir}/src`,
      '@public': `${rootDir}/public`,
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['link:href'],
              interpolate: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|ico|gif|png|svg|woff|ttf|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
    }),
  ],
};
