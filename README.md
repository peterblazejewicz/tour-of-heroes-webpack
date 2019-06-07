# Tour Of Heroes

[![Greenkeeper badge](https://badges.greenkeeper.io/peterblazejewicz/tour-of-heroes-webpack.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/peterblazejewicz/tour-of-heroes-webpack.svg?branch=master)](https://travis-ci.org/peterblazejewicz/tour-of-heroes-webpack)

`TOH` by John Papa built only with Webpack 4. This project uses `@ngtools/webpack` to work with Angular specific bundling (`.ts`, `.html`, `.css`, `.scss` files).

The Webpack configuration file supports string type checking within VSCode thanks to `@ts-check` pragma.

## Usage

### Development

The TOH starts on the same port as CLI:

```bash
npm i
npm start
```

Linting:

```bash
npm run lint
npm run lint:fix
```

The Webpack configuration is being build depending on the mode:

```js
// @ts-check
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

/** @type {(env: any, argv: any) => webpack.Configuration} config */
const configuration = (env = {}, argv) => {
  const common = require('./config/webpack.common')(env, argv);
  if (env.production || env.prod) {
    return webpackMerge(common, require('./config/webpack.prod')(env, argv));
  }
  if (env.development || env.dev) {
    return webpackMerge(common, require('./config/webpack.dev')(env, argv));
  }
};

module.exports = configuration;
```

The generated output is split into directories in the following way:

```text
- dist/
  - toh/
    - assets/
    - css/
    - js/
    index.html
    favicon.ico
```

### CI Build

This repo suports `Travis CI` and runs Karma using headless version of the Chrome browser. See `.travis.yml` for details:

```txt
$ npm run test -- --single-run --no-watch --no-progress --browsers=ChromeHeadlessCI
> toh.angular@0.0.0 test /home/travis/build/peterblazejewicz/tour-of-heroes-webpack
> karma start src/karma.conf.js "--single-run" "--no-watch" "--no-progress" "--browsers=ChromeHeadlessCI"
04 06 2019 21:59:59.452:INFO [compiler.karma-typescript]: Compiling project using Typescript 3.5.1
04 06 2019 22:00:06.066:INFO [compiler.karma-typescript]: Compiled 19 files in 6589 ms.
04 06 2019 22:00:09.344:INFO [bundler.karma-typescript]: Bundled imports for 19 file(s) in 2775 ms.
04 06 2019 22:00:09.940:INFO [karma-server]: Karma v4.1.0 server started at http://0.0.0.0:9876/
04 06 2019 22:00:09.941:INFO [launcher]: Launching browsers ChromeHeadlessCI with concurrency unlimited
04 06 2019 22:00:09.946:INFO [launcher]: Starting browser ChromeHeadless
04 06 2019 22:00:10.857:INFO [HeadlessChrome 75.0.3770 (Linux 0.0.0)]: Connected on socket qrBVviQNfeu5peptAAAA with id 23475617
HeadlessChrome 75.0.3770 (Linux 0.0.0): Executed 0 of 2 SUCCESS (0 secs / 0 secs)
e 75.0.3770 (Linux 0.0.0): Executed 1 of 2 SUCCESS (0 secs / 0.109 secs)
e 75.0.3770 (Linux 0.0.0): Executed 2 of 2 SUCCESS (0 secs / 0.172 secs)
e 75.0.3770 (Linux 0.0.0): Executed 2 of 2 SUCCESS (0.198 secs / 0.172 secs)
TOTAL: 2 SUCCESS
TOTAL: 2 SUCCESS
The command "npm run test -- --single-run --no-watch --no-progress --browsers=ChromeHeadlessCI" exited with 0.
```

## TODO

- [x] split Webpack configuration as per best pracises section
- [x] Webpack dev server support
- [x] prod/dev/test builds
- [ ] drop-in replacement with `@angular-devkit/build-webpack`
- [x] CSS/SCSS support
- [x] ESLint test and fix support
- [x] Prettier formatting check and fix support

## Author

@peterblazejewicz
