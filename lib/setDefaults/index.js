import winston from 'winston';
import { merge } from 'lodash';
import config from '../../config';

export default function setDefaults(options) {
  return new Promise((resolve, reject) => {
    const opts = {
      options: config.app,
    };

    winston.log('silly', 'Setting defaults');
    resolve(merge(options, opts));
  });
}
