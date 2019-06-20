import { resolve } from 'path';
import { Configuration } from 'webpack-dev-server';

export const webpackDevServerConfiguration: (env: any, argv: any) => Configuration = (
  env = {},
  argv
) => {
  return {
    compress: true,
    contentBase: resolve('../..', 'dist'),
    historyApiFallback: true,
    open: true,
    port: 4200,
  };
};
