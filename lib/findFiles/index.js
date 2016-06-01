import glob from 'glob';

export default function findFiles(find) {
  return new Promise((resolve, reject) => {
    glob(find, (err, files) => {
      if (err) return reject(err);

      const fileArr = files.map((file) => {
        const arr = file.split('/');
        arr.shift();
        return arr.join('/');
      });

      return resolve(fileArr);
    });
  });
}
