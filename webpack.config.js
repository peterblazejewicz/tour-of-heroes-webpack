// @ts-check
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const path = require('path');
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
            path.resolve(__dirname, 'src/main.scss'),
            path.resolve(__dirname, 'src/styles'),
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
            path.resolve(__dirname, 'src/main.scss'),
            path.resolve(__dirname, 'src/styles'),
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
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
    plugins: [
      // angular/angular#11580
      new webpack.ContextReplacementPlugin(
        /\@angular(\\|\/)core(\\|\/)fesm5/,
        path.resolve(__dirname, 'src'),
        {}
      ),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets',
        },
        {
          from: 'src/static',
          to: '',
        },
      ]),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
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
        entryModule: path.join(__dirname, 'src/app/app.module#AppModule'),
        mainPath: path.join(__dirname, 'src/main'),
        tsConfigPath: path.resolve(__dirname, './src/tsconfig.app.json'),
      }),
    ],
    stats: {
      // angular/angular#21560
      warningsFilter: /System.import/,
    },
  };
};

module.exports = configuration;
