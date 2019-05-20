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

#### Paths aliases support

To add new TS aliases like `@toh`, modify `tsconfig.json` file. The webpack configuration takes care about creating module aliases based on TS configuration file:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@toh/dashboard/dashboard.component';
import { HeroDetailComponent } from '@toh/hero-detail/hero-detail.component';
import { HeroesComponent } from '@toh/heroes/heroes.component';
```

```json
"paths": {
  "@toh/*": ["src/app/*"]
}
```

## TODO

- [x] split Webpack configuration as per best pracises section
- [x] Webpack dev server support
- [x] prod/dev/test builds
- [ ] drop-in replacement with `@angular-devkit/build-webpack`
- [x] CSS/SCSS support
- [x] path aliases support

## Author

@peterblazejewicz
