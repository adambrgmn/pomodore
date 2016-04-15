import React from 'react';
import styles from './App.css';

import ProgressBar from '../ProgressBar/ProgressBar';
import Counter from '../Counter/Counter';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <Counter timeLeft={69} />
        <ProgressBar barWidth="50%" />
      </div>
    );
  }
}
