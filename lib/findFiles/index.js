import glob from 'glob';

export default function findFiles(find) {
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

      return resolve(fileObj);
    });
  });
}
