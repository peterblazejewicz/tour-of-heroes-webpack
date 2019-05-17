// @ts-check
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

/** @type {(env: any, argv: any) => webpack.Configuration} configuration */
const configuration = (env = {}, argv) => {
  const common = require('./config/webpack.common')(env, argv);
  if (env.production || env.prod || argv.mode === 'production') {
    return webpackMerge(common, require('./config/webpack.prod')(env, argv));
  }
  if (env.development || env.dev || argv.mode === 'development') {
    return webpackMerge(common, require('./config/webpack.dev')(env, argv));
  }
};

module.exports = configuration;
