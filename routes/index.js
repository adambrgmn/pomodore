const winston = require('winston');
const _ = require('lodash');
const findFiles = require('../lib/findFiles');
const getManifestContent = require('../lib/getManifestContent');
const renderApp = require('../lib/renderApp');
const setDefaults = require('../lib/setDefaults');

function routes(app) {
  const options = {};
  let error;
  findFiles('dist/**/*.{js,css}', {})
    .then(getManifestContent)
    .then(renderApp)
    .then(setDefaults)
    .then((opt) => {
      winston.log('silly', 'Prepared app');
      return _.merge(options, opt);
    })
    .catch((err) => {
      winston.log('error', 'Error preparing app', err);
      error = err;
    });

  app.get('*', (req, res, next) => {
    if (error) return next(error);
    return res.render('index', options);
  });
}

module.exports = routes;
