# Tour Of Heroes

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

## TODO

- [ ] split Webpack configuration as per best pracises section
- [x] Webpack dev server support
- [ ] prod/dev/test builds
- [ ] drop-in replacement with `@angular-devkit/build-webpack`
- [x] CSS/SCSS support

## Author

@peterblazejewicz
