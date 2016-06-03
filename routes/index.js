import winston from 'winston';
import { merge } from 'lodash';
import findFiles from '../lib/findFiles';
import getManifestContent from '../lib/getManifestContent';
import setDefaults from '../lib/setDefaults';
import renderApp from '../lib/renderApp';

export default function routes(app) {
  const options = {};
  let error;
  findFiles('dist/**/*.{js,css}', {})
    .then(getManifestContent)
    .then(setDefaults)
    .then(renderApp)
    .then((opt) => {
      winston.log('silly', 'Prepared app');
      return merge(options, opt);
    })
    .catch((err) => {
      error = err;
    });

  app.get('*', (req, res, next) => {
    if (error) return next(error);
    return res.render('index', options);
  });
}
