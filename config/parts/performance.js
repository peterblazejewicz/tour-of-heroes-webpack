// @ts-check
const webpack = require('webpack');

/** @type {(env: any, argv: any) => webpack.Options.Performance | false } configuration */
const configuration = (env = {}, argv) => {
  return {
    maxAssetSize: env.producation ? 1000000 : 10000000,
    maxEntrypointSize: env.production ? 1000000 : 10000000,
    hints: env.producation ? 'error' : 'warning',
  };
};

module.exports = configuration;
