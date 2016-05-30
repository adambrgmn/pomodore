import React from 'react';

import './styles.scss';

export default function Button(props) {
  return (
    <button className="button animated" onClick={() => props.handleClick(props.text)}>{props.text}</button>
  );
}

Button.propTypes = {
  handleClick: React.PropTypes.func,
  value: React.PropTypes.number,
  text: React.PropTypes.string.isRequired,
};
