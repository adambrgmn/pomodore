import React from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import Counter from '../Counter/Counter';

const stateMock = {
  started: false,
  startTime: 900000,
  currentTime: 0,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateMock;
    this.ticker = this.ticker.bind(this);
  }
  ticker() {
    this.setState({ currentTime: this.state.currentTime + 1000 });
  }
  startTimer() {
    this.interval = setInterval(this.ticker, 1000);
  }
  render() {
    return (
      <div className="container">
        <Counter {...this.state} />
        <ProgressBar {...this.state} />
        <button onClick={() => this.startTimer()}>Start Timer</button>
        <span>{this.state.currentTime}</span>
        <span>{this.state.startTime}</span>
      </div>
    );
  }
}
