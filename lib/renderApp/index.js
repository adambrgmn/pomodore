const _ = require('lodash');

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Home from '../../src/scenes/Home';

function renderApp(options) {
  return new Promise((resolve, reject) => {
    const opt = {};
    try {
      opt.app = ReactDOMServer.renderToString(<Home />);
    } catch (err) {
      return reject(err);
    }

    return resolve(_.merge(options, opt));
  });
}

module.exports = renderApp;
