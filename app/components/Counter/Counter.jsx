import React from 'react';
import styles from './Counter.css';

export default class Counter extends React.Component {
  convertTime(startTime, currentTime) {
    function strPadLeft(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    const timeLeft = (startTime - currentTime) / 1000; // Get time left from ms to seconds
    const minutes = Math.floor(timeLeft / 60); // Get minutes left
    const seconds = timeLeft - minutes * 60; // Get seconds of last minute left

    return `${strPadLeft(minutes, '0', 2)}:${strPadLeft(seconds, '0', 2)}`;
  }
  render() {
    return (<div className={styles.counter}>
      {this.convertTime(this.props.startTime, this.props.currentTime)}
    </div>);
  }
}
