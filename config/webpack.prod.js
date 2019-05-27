// @ts-check
/** @type {(env: any, argv: any) => import('webpack').Configuration} config */
const configuration = (env = {}, argv) => {
  return {
    mode: 'production',
    devtool: 'nosources-source-map',
  };
};

module.exports = configuration;
