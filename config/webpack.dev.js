// @ts-check
/** @type {(env: any, argv: any) => import('webpack').Configuration} config */
const configuration = (env = {}, argv) => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
  };
};

module.exports = configuration;
