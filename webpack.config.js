'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app/main.js'),
  build: path.join(__dirname, 'dist'),
};

const common = {
  entry: [PATHS.app],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jade$/,
        loader: 'jade',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/templates/index.jade',
      inject: false,
      title: 'Pomodore',
      appMountId: 'app',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
};

if (TARGET === 'start' || !TARGET) {
  common.entry.push('webpack-hot-middleware/client?reload=true');
  common.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  );

  module.exports = merge(common, {
    detool: 'eval-source-map',
    output: {
      filename: '[name].js',
    },
    module: {
      loaders: [
        {
          test: /\jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
          },
        },
        {
          test: /\.json?$/,
          loader: 'json',
        },
        {
          test: /\.css$/,
          loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]',
        },
      ],
    },
  });
}

if (TARGET === 'build') {
  common.plugins.push(
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  );

  module.exports = merge(common, {
    output: {
      filename: '[name]-[hash].js',
    },
    module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      }, {
        test: /\.json?$/,
        loader: 'json',
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss'
        ),
      }],
    },
    postcss: [
      require('autoprefixer'),
    ],
  });
}
