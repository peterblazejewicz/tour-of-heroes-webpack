module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine', 'karma-typescript'],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/TourOfHeroes'),
      reports: ['html'],
      skipFilesWithNoCoverage: true,
    },
    files: [{ pattern: 'src/test.ts' }, { pattern: 'src/**/*.+(ts|html)' }],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-typescript'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },

    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /(test|\.spec)\.ts$/,
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
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
  });
};
