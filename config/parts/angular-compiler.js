// @ts-check
const { AngularCompilerPlugin, PLATFORM } = require('@ngtools/webpack');
const { join, resolve } = require('path');
const root = resolve(__dirname, '../..');

/** @type {(env: any, argv: any) => AngularCompilerPlugin} configuration */
const configuration = (env = {}, argv) => {
  return new AngularCompilerPlugin({
    platform: PLATFORM.Browser,
    entryModule: join(root, 'src/app/app.module#AppModule'),
    mainPath: join(root, 'src/main'),
    tsConfigPath: resolve(root, 'src/tsconfig.app.json'),
    sourceMap: env.production ? false : true,
    skipCodeGeneration: false,
    directTemplateLoading: true
  });
};

module.exports = configuration;
