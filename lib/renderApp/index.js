import winston from 'winston';
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
      winston.log('error', 'Error trying to render app to string');
      return reject(err);
    }

    winston.log('silly', 'App rendered to sting');
    return resolve(merge(options, opt));
  });
}
