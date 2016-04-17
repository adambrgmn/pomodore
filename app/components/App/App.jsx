import React from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import Counter from '../Counter/Counter';

const stateMock = {
  timer: {
    started: false,
    startTime: 900000,
    currentTime: 11000,
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <Counter {...stateMock} />
        <ProgressBar {...stateMock} />
      </div>
    );
  }
}
