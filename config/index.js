import { normalize } from 'path';
import { merge } from 'lodash';
import pkg from '../package.json';

const common = {
  env: process.env.NODE_ENV || 'development',
  root: normalize(`${__dirname}/..`),
  port: process.env.PORT || 3000,
  logLevel: process.env.LOG_LEVEL || 'silly',
  app: {
    title: `${pkg.name.charAt(0).toUpperCase()}${pkg.name.slice(1)}`,
    subtitle: pkg.description,
    description: 'Pomodore is a small, simple and – if I may say so – beautiful tomato timer. Just start a new pomodore and work until you hear the bell.',
    url: 'http://pomodore.fransvilhelm.com/',
    gaId: 'UA-71140948-1',
    fbId: '1528042234158058',
    themeColor: '#000aff',
    appMountId: 'app',
  },
  cdn: {
    react: 'https://fb.me/react-with-addons-15.1.0.min.js',
    reactDOM: 'https://fb.me/react-dom-15.1.0.min.js',
    immutable: 'https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js',
  },
};

const env = {
  production: {},
  development: {},
};

const config = merge(common, env[common.env]);

export default config;
