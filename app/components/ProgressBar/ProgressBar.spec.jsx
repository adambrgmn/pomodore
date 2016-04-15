import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from 'react-addons-test-utils';
import { expect } from 'chai';

import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('should render a progress bar', () => {
    const component = renderIntoDocument(<ProgressBar />);
    const bar = scryRenderedDOMComponentsWithTag(component, 'div');

    expect(bar.length).to.equal(2);
  });
});
