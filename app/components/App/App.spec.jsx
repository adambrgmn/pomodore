import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from 'react-addons-test-utils';
import { expect } from 'chai';

import App from './App';

describe('App', () => {
  it('should render an app', () => {
    const component = renderIntoDocument(<App />);
    const header = scryRenderedDOMComponentsWithTag(component, 'h1');

    expect(header.length).to.equal(1);
  });
});
