import React, { Component } from 'react';
import classnames from 'classnames';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      fadeInDown: false,
      fadeOutDown: false,
    };
  }
  componentWillAppear(cb) {
    this.setState({ show: true });
    cb();
  }
  componentWillEnter(cb) {
    setTimeout(() => {
      this.setState({ show: true, fadeInDown: true });
      setTimeout(() => cb(), 1000);
    }, 1000);
  }
  componentDidEnter() {
    this.setState({ fadeInDown: false });
  }
  componentWillLeave(cb) {
    this.setState({ fadeOutDown: true });
    setTimeout(() => cb(), 1000);
  }
  componentDidLeave() {
    this.setState({ show: false, fadeOutDown: false });
  }
  render() {
    const classname = classnames({
      button: true,
      'button-animated': true,
      'hide-button': !this.state.show,
      'button-fadeInDown': this.state.fadeInDown,
      'button-fadeOutDown': this.state.fadeOutDown,
    });

    return (
      <button
        className={classname}
        onClick={() => this.props.handleClick(this.props.text)}
        data-popover={this.props.popover}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: React.PropTypes.func,
  text: React.PropTypes.string.isRequired,
  popover: React.PropTypes.string,
};
