import { Options } from 'webpack';

export const performanceConfiguration: (
  env: any,
  argv: any
) => Options.Performance = (env, argv) => {
  return {
    maxAssetSize: env.producation ? 1000000 : 10000000,
    maxEntrypointSize: env.production ? 1000000 : 10000000,
    hints: env.producation ? 'error' : 'warning',
  };
};
