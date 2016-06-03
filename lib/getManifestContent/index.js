import winston from 'winston';
import { readFile } from 'fs';
import { merge } from 'lodash';
import path from 'path';
import config from '../../config';

export default function getFileContent(options) {
  return new Promise((resolve, reject) => {
    const manifestPath = path.resolve(config.root, 'dist', options.files.manifest);

    readFile(manifestPath, 'utf8', (err, fileContent) => {
      if (err) return reject(err);
      const opt = {
        files: {
          manifest: fileContent,
        },
      };

      winston.log('silly', 'Parsed manifest-file to string');
      return resolve(merge(options, opt));
    });
  });
}
