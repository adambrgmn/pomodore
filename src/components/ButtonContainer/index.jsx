import React from 'react';

import './styles.scss';

export default function ButtonContainer(props) {
  return (
    <div className="timer-buttons">
      {props.children}
    </div>
  );
}

ButtonContainer.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};
