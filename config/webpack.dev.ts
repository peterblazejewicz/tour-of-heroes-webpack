import { Configuration } from 'webpack';

export const developmentConfiguration: (env: any, argv: any) => Configuration = (
  env = {},
  argv
) => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
  };
};
