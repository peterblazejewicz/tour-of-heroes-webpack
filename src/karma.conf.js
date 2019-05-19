const { resolve } = require('path');
module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      { pattern: 'src/base.spec.ts' },
      { pattern: 'src/app/**/*.+(ts|html)' },
    ],

    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },

    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [require('karma-typescript-angular2-transform')],
      },
      compilerOptions: {
        lib: ['ES2015', 'DOM'],
      },
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
