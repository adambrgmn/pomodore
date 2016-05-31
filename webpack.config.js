const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    bundle: path.join(PATHS.app, 'app.js'),
    styles: path.join(PATHS.app, 'app.scss'),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app,
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      {
        test: /\.jade$/,
        loaders: ['jade'],
      },
    ],
  },
  postcss: () => [autoprefixer],
  sassLoader: {
    data: `$env: '${TARGET}';`,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT,
      contentBase: 'public/',
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap'],
          include: PATHS.app,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'templates/index.jade',
        appMountId: 'app',
        inject: false,
        title: ((str) => {
          const arr = str.split('');
          arr[0] = arr[0].toUpperCase();
          return arr.join('');
        })(pkg.name),
        subtitle: pkg.description,
        description: pkg.description,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  });
}

if (TARGET === 'build' || TARGET === 'build:stats') {
  module.exports = merge(common, {
    entry: {
      vendor: [
        'react',
        'react-dom',
        'react-addons-css-transition-group',
        'react-addons-pure-render-mixin',
        'react-addons-transition-group',
        'classnames',
        'immutable',
      ],
    },
    output: {
      filename: '[name].[hash].min.js',
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
          include: PATHS.app,
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('style.[hash].min.css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BROWSER': true,
        __DEV__: false,
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].min.js'),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, screw_ie8: true },
      }),
      new CleanPlugin([PATHS.build]),
    ],
  });
}
