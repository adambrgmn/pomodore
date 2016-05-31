import React from 'react';
import ReactDOM from 'react-dom';

import Home from './scenes/Home';

const component = (<Home />);
const mountPoint = document.getElementById('app');

ReactDOM.render(component, mountPoint);
