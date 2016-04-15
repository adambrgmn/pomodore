import React from 'react';
import styles from './Counter.css';

export default class Counter extends React.Component {
  convertTime(time) {
    function strPadLeft(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return `${strPadLeft(minutes, '0', 2)}:${strPadLeft(seconds, '0', 2)}`;
  }
  render() {
    return <div className={styles.counter}>{this.convertTime(this.props.timeLeft)}</div>;
  }
}
