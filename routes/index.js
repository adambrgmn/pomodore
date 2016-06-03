import findFiles from '../lib/findFiles';
import getManifestContent from '../lib/getManifestContent';
import setDefaults from '../lib/setDefaults';

export default function routes(app) {
  app.get('*', (req, res, next) => {
    findFiles('dist/**/*.{js,css}', {}) // Find paths to app files (in dist)
      .then(getManifestContent) // Convert manifest to string
      .then(setDefaults) // Set default options
      .then((opt) => {
        const options = opt;
        options.app = app.get('renderedApp'); // App already rendered in memory
        options.cdn = {
          react: 'https://fb.me/react-with-addons-15.1.0.min.js',
          reactDOM: 'https://fb.me/react-dom-15.1.0.min.js',
          immutable: 'https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js',
        };
        return res.render('index', options);
      }) // Render with index.jade
      .catch(next); // Catch if errors
  });
}
