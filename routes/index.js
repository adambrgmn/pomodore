import winston from 'winston';
import findFiles from '../lib/findFiles';
import getManifestContent from '../lib/getManifestContent';
import renderApp from '../lib/renderApp';
import setDefaults from '../lib/setDefaults';

export default function routes(app) {
  app.get('*', (req, res, next) => {
    winston.profile('request');
    findFiles('dist/**/*.{js,css}', {})        // Find paths to app files (in dist)
      .then(getManifestContent)                // Convert manifest to string
      .then(renderApp)                         // Render app to string
      .then(setDefaults)                       // Set default options
      .then((opt) => {
        winston.profile('request');
        return res.render('index', opt);
      }) // Render with index.jade
      .catch(next);                            // Catch if errors
  });
}
