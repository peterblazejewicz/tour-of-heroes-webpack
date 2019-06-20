import { Configuration } from 'webpack';

export const productionConfiguration: (env: any, argv: any) => Configuration = (
  env = {},
  argv
) => {
  return {
    mode: 'production',
    devtool: 'nosources-source-map',
  };
};
