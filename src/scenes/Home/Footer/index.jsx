import React from 'react';
import capitalizeFirst from '../../../lib/capitalizeFirst';

import './styles.scss';

export default function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer-paragraph">
        {capitalizeFirst(props.title)} v{props.version} |&nbsp;
        <a href="#" className="footer-link" onClick={props.handleAboutClick}>About</a> |&nbsp;
        <a href={props.authorLink} className="footer-link">Me</a>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  title: React.PropTypes.string.isRequired,
  version: React.PropTypes.string.isRequired,
  authorLink: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  handleAboutClick: React.PropTypes.func,
};
