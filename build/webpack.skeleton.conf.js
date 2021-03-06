
'use strict';

const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const nodeExternals = require('webpack-node-externals');
const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

function resolve (dir) {
  return path.join(__dirname, dir);
}

let skeletonWebpackConfig = merge(baseWebpackConfig, {
  target: 'node',
  devtool: false,
  entry: {
    app: resolve('../src/skeleton/entry-skeleton.js')
  },
  output: Object.assign({}, baseWebpackConfig.output, {
    libraryTarget: 'commonjs2'
  }),
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: []
});
// skeletonWebpackConfig.module.rules[1]这里不一定是0或1，要看webpack.base.conf.js下rules中vue-loader的下标是多少
skeletonWebpackConfig.module.rules[1].options.loaders = utils.cssLoaders({
  sourceMap: sourceMapEnabled,
  extract: true
});
module.exports = skeletonWebpackConfig;