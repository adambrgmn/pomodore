import { normalize } from 'path';
import _ from 'lodash';

const common = {
  env: process.env.NODE_ENV || 'development',
  root: normalize(`${__dirname}/..`),
  port: process.env.PORT || 3000,
  logLevel: process.env.LOG_LEVEL || 'silly',
};

const env = {
  production: {},
  development: {},
};

const config = _.merge(common, env[common.env]);

export default config;
