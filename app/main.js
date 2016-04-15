import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

const component = <App />;
const mountPoint = document.getElementById('app');

ReactDOM.render(component, mountPoint);
