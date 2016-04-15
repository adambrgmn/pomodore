import React from 'react';
import styles from './ProgressBar.css';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.progressBar.style.width = this.props.barWidth;
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
