import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { merge } from 'lodash';

import Home from '../../src/scenes/Home';

export default function renderApp(options) {
  return new Promise((resolve, reject) => {
    const opt = {};

    try {
      opt.app = ReactDOMServer.renderToString(<Home />);
    } catch (err) {
      return reject(err);
    }

    return resolve(merge(options, opt));
  });
}
