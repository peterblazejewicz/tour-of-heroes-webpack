import { Configuration } from 'webpack';
import WebpackMerge from 'webpack-merge';

import { commonConfiguration } from './config/webpack.common';
import { developmentConfiguration } from './config/webpack.dev';
import { productionConfiguration } from './config/webpack.prod';

const configuration: (env: any, argv: any) => Configuration = (env, argv) => {
  if (env.production || env.prod || argv.mode === 'production') {
    return WebpackMerge(
      commonConfiguration(env, argv),
      productionConfiguration(env, argv)
    );
  }
  return WebpackMerge(
    commonConfiguration(env, argv),
    developmentConfiguration(env, argv)
  );
};

export default configuration;
