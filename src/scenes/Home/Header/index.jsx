import React from 'react';
import capitalizeFirst from '../../../lib/capitalizeFirst';

export default function Header(props) {
  return (
    <header className="header">
      <h1 className="title">{capitalizeFirst(props.title)}</h1>
      <p className="tagline">{props.description}</p>
    </header>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
};
