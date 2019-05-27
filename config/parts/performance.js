// @ts-check
/** @type {(env: any, argv: any) => import('webpack').Options.Performance | false } configuration */
const configuration = (env = {}, argv) => {
  return {
    maxAssetSize: env.producation ? 1000000 : 10000000,
    maxEntrypointSize: env.production ? 1000000 : 10000000,
    hints: env.producation ? 'error' : 'warning',
  };
};

module.exports = configuration;
