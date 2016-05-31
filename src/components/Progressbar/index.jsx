import React from 'react';

export default function Progressbar(props) {
  return (
    <div className="timer-progressbar-container">
      <div
        className="timer-progressbar"
        style={{ width: `${props.progress}%` }}
      />
    </div>
  );
}

Progressbar.propTypes = {
  progress: React.PropTypes.string.isRequired,
};
