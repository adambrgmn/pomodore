import React from 'react';

import './styles.scss';

export default function Button(props) {
  return props.show ? (
    <button className="button" onClick={() => props.handleClick(props.value)}>{props.text}</button>
  ) : null;
}

Button.propTypes = {
  handleClick: React.PropTypes.func,
  value: React.PropTypes.number,
  text: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool,
};
