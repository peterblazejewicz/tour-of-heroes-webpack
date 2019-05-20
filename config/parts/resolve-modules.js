// @ts-check
const { resolve } = require('path');
const wepback = require('webpack');
// @ts-ignore
const { paths = [] } = require('../../tsconfig.json').compilerOptions;

/** @type {(env: any, argv: any) => wepback.Resolve} configuration */
const configuration = (env = {}, argv) => {
  /** @type {{ [key: string]: string; }} aliases */
  const aliases = {};
  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '');
    const value = resolve(
      __dirname,
      '../../',
      paths[item][0].replace('/*', '')
    );
    aliases[key] = value;
  });
  return {
    extensions: ['.js', '.ts', '.scss'],
    alias: aliases,
  };
};

module.exports = configuration;
