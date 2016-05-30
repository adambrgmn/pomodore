import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import './styles.scss';

export default function ButtonContainer(props) {
  return (
    <ReactTransitionGroup component="div" className="timer-buttons">
      {props.children}
    </ReactTransitionGroup>
  );
}

ButtonContainer.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};
