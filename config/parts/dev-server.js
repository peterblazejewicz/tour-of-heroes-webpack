// @ts-check
const { resolve } = require('path');

/** @type {(env: any, argv: any) => import('webpack-dev-server').Configuration} configuration */
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
