// @ts-check
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
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
      polyfills: './src/polyfills.ts',
      main: ['./src/main.ts', './src/styles.css'],
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
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html'),
        inject: true,
      }),
      // the plugin must come after HtmlWebpackPlugin.
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
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
    ],
  };
};

module.exports = configuration;
