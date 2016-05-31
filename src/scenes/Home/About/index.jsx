import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

import './styles.scss';

export function AboutContainer(props) {
  return <ReactTransitionGroup component="div">{props.children}</ReactTransitionGroup>;
}

AboutContainer.PropTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
};

export class About extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentWillEnter(cb) {
    this.setState({ show: true });
    cb();
  }

  componentWillLeave(cb) {
    this.setState({ show: false });
    setTimeout(() => cb(), 1000);
  }

  render() {
    const classname = classnames({
      'about-text': true,
      animated: true,
      fadeInUp: this.state.show,
      fadeOutDown: !this.state.show,
    });
    return (
      <div className={classname}>
        <p>Pomodore is a small, simple and – if I may say so – beautiful <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" className="about-link">tomato timer</a>.</p>
        <p>The usage is pretty straightforward: Just start a new pomodore and work until you hear the bell.</p>
        <p>Then take a small break, stretch your legs and grab a cup of coffee. And every once in a while you may take a longer break and contemplate over the meaning of life.</p>
        <ul className="about-list">
          <li><strong>Pomodore:</strong> 25 minutes</li>
          <li><strong>Short break:</strong> 5 minutes</li>
          <li><strong>Long break:</strong> 15 minutes</li>
        </ul>
        <p><a href="https://www.facebook.com/dialog/share?app_id=1528042234158058&amp;display=popup&amp;href=http%3A%2F%2Fpomodore.fransvilhelm.com&amp;redirect_uri=http%3A%2F%2Fpomodore.fransvilhelm.com" className="about-link">Share on Facebook!</a></p>
      </div>
    );
  }
}
