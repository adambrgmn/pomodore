import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Home from '../../src/scenes/Home';

export default function renderApp() {
  const app = ReactDOMServer.renderToString(<Home />);
  return app;
}
