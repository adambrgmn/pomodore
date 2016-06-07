const winston = require('winston');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const config = require('../../config');

function getFileContent(options) {
  return new Promise((resolve, reject) => {
    const manifestPath = path.resolve(config.root, 'dist', options.files.manifest);

    fs.readFile(manifestPath, 'utf8', (err, fileContent) => {
      if (err) return reject(err);
      const opt = {
        files: {
          manifest: fileContent,
        },
      };

      winston.log('silly', 'Parsed manifest-file to string');
      return resolve(_.merge(options, opt));
    });
  });
}

module.exports = getFileContent;
