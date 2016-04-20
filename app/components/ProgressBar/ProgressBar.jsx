import React from 'react';
import styles from './ProgressBar.css';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    const percentLeft = 100 - (this.props.currentTime / this.props.startTime) * 100;
    this.progressBar.style.width = `${percentLeft}%`;
  }
  render() {
    return (
      <div className={styles.ProgressBarContainer}>
        <div className={styles.ProgressBar}
          ref={ref => (this.progressBar = ref)}
        ></div>
      </div>
    );
  }
}
