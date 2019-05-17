// @ts-check
const webpackDevServer = require('webpack-dev-server');
const { resolve } = require('path');

/** @type {(env: any, argv: any) => webpackDevServer.Configuration} configuration */
const configuration = (env = {}, argv) => {
  return {
    compress: true,
    contentBase: resolve('../..', 'dist'),
    historyApiFallback: true,
    open: true,
    port: 4200,
  };
};

module.exports = configuration;
