import React from 'react';

import convertTime from '../../lib/convertTime';

import './styles.scss';

export default function Counter(props) {
  const time = convertTime(props.time);
  const displayTime = props.time > 0 ? time : { min: '--', sec: '--' };

  return (
    <div className="timer-counter">
      {`${displayTime.min}:${displayTime.sec}`}
    </div>
  );
}

Counter.propTypes = {
  time: React.PropTypes.number.isRequired,
};
