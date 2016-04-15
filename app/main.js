require('./main.css');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

const component = <App />;
const mountPoint = document.getElementById('app');

ReactDOM.render(component, mountPoint);
