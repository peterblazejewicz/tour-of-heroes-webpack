// @ts-check
const webpack = require('webpack');

/** @type {(env: any, argv: any) => webpack.Configuration} config */
const configuration = (env = {}, argv) => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    performance: {
      hints: 'warning',
    },
  };
};

module.exports = configuration;
