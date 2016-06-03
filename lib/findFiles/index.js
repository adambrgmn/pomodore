import glob from 'glob';
import { merge } from 'lodash';

export default function findFiles(find, options) {
  return new Promise((resolve, reject) => {
    glob(find, (err, files) => {
      if (err) return reject(err);
      const fileObj = {};

      files.forEach((file) => {
        if (file.match(/js\/style/)) return;
        const filename = file.split('/')[2].split('.')[0];
        const filepath = file.split('/');
        filepath.shift();
        fileObj[filename] = filepath.join('/');
      });

      const opt = { files: fileObj };

      return resolve(merge(options, opt));
    });
  });
}
