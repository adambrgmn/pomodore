const winston = require('winston');
const _ = require('lodash');
const findFiles = require('../lib/findFiles');
const getManifestContent = require('../lib/getManifestContent');
const setDefaults = require('../lib/setDefaults');
const renderApp = require('../lib/renderApp');

function routes(app) {
  const options = {};
  let error;
  findFiles('dist/**/*.{js,css}', {})
    .then(getManifestContent)
    .then(setDefaults)
    .then(renderApp)
    .then((opt) => {
      winston.log('silly', 'Prepared app');
      return _.merge(options, opt);
    })
    .catch((err) => {
      error = err;
    });

  app.get('*', (req, res, next) => {
    if (error) return next(error);
    return res.render('index', options);
  });
}

module.exports = routes;
