const winston = require('winston');
const _ = require('lodash');
const config = require('../../config');

function setDefaults(options) {
  return new Promise((resolve, reject) => {
    const opts = {
      options: config.app,
      cdn: config.cdn,
    };

    winston.log('silly', 'Setting defaults');
    resolve(_.merge(options, opts));
  });
}

module.exports = setDefaults;
