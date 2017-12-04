const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common');

const rootDir = path.resolve(__dirname, '../');

module.exports = merge.smart(common, {
  entry: [`${rootDir}/src/index.tsx`],
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: `${rootDir}/bundle-report.html`,
    }),
  ],
});
