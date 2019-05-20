// @ts-check
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  IndexHtmlWebpackPlugin,
} = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { join, resolve } = require('path');
const webpack = require('webpack');
const root = resolve(__dirname, '..');

/** @type {(env: any, argv: any) => webpack.Configuration} config */
const configuration = (env = {}, argv) => {
  return {
    resolve: {
      extensions: ['.js', '.ts', '.scss'],
    },
    entry: {
      // the order does not matter as we are using [entrypoints]
      main: resolve(root, 'src/main.ts'),
      polyfills: resolve(root, 'src/polyfills.ts'),
      styles: resolve(root, 'src/styles.scss'),
    },
    module: {
      rules: [
        {
          test: /(\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack',
        },
        {
          test: /\.css|scss$/,
          use: [
            'to-string-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: resolve(root, 'config/'),
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          exclude: [
            resolve(root, 'src/main.scss'),
            resolve(root, 'src/styles'),
          ],
        },
        {
          test: /\.css|scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: resolve(root, 'config/'),
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          include: [
            resolve(root, 'src/main.scss'),
            resolve(root, 'src/styles'),
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: resolve(root, 'src/index.html'),
        },
        {
          // angular/angular#11580
          // angular/angular#21560
          test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
          parser: { system: true },
        },
      ],
    },
    output: {
      path: resolve(root, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            filename: '[name].bundle.js',
            chunks: 'initial',
          },
        },
      },
    },
    performance: {
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new IndexHtmlWebpackPlugin({
        baseHref: '/',
        input: resolve(root, 'src/index.html'),
        output: 'index.html',
        // order matters
        entrypoints: ['styles', 'polyfills', 'main'],
        sri: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[name].css',
      }),
      new AngularCompilerPlugin({
        entryModule: join(root, 'src/app/app.module#AppModule'),
        mainPath: join(root, 'src/main'),
        tsConfigPath: resolve(root, 'src/tsconfig.app.json'),
      }),
      new webpack.ProgressPlugin(),
      new CircularDependencyPlugin({
        exclude: /[\\\/]node_modules[\\\/]/,
      }),
      new CopyWebpackPlugin(
        [
          {
            from: 'src/assets',
            to: 'assets',
          },
          {
            from: 'src/static',
            to: '',
          },
        ],
        {
          ignore: ['.gitkeep'],
        }
      ),
    ],
    devServer: require('./parts/dev-server')(env, argv),
  };
};

module.exports = configuration;
