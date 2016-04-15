import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import { expect } from 'chai';

import App from './App';

describe('App', () => {
  it('should render an app', () => {
    const component = renderIntoDocument(<App />);
    const nodeTree = scryRenderedDOMComponentsWithClass(component, 'container');

    expect(nodeTree.length).to.equal(1);
  });
});
