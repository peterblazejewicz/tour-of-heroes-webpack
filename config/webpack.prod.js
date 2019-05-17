// @ts-check
const webpack = require('webpack');

/** @type {(env: any, argv: any) => webpack.Configuration} config */
const configuration = (env = {}, argv) => {
  return {
    mode: 'production',
    devtool: 'nosources-source-map',
    performance: {
      hints: 'error',
    }
  };
};

module.exports = configuration;
