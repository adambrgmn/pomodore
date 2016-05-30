import React from 'react';

export default function Button(props) {
  return (
    <button>{props.value}</button>
  );
}

Button.propTypes = {
  value: React.PropTypes.string.isRequired,
};
