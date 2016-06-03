import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Home from '../../src/scenes/Home';

export default function renderApp() {
  return ReactDOMServer.renderToString(<Home />);
}
