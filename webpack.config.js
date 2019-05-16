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

/** @type {(env: any, argv: any) => webpack.Configuration} config */
const configuration = (env = {}, argv) => {
  return {
    mode: env.production ? 'production' : 'development',
    resolve: {
      extensions: ['.js', '.ts'],
    },
    entry: {
      // the order does not matter as we are using [entrypoints]
      main: './src/main.ts',
      polyfills: './src/polyfills.ts',
      styles: './src/styles.css',
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
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          exclude: [
            resolve(__dirname, 'src/main.scss'),
            resolve(__dirname, 'src/styles'),
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
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          include: [
            resolve(__dirname, 'src/main.scss'),
            resolve(__dirname, 'src/styles'),
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
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
      path: resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            filename: '[name].bundle.js',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            filename: '[name].bundle.js',
          },
        },
      },
    },
    performance: {
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
      hints: 'error',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new IndexHtmlWebpackPlugin({
        baseHref: '/',
        input: resolve('src/index.html'),
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
        entryModule: join(__dirname, 'src/app/app.module#AppModule'),
        mainPath: join(__dirname, 'src/main'),
        tsConfigPath: resolve(__dirname, './src/tsconfig.app.json'),
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
  };
};

module.exports = configuration;
