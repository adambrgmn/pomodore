import React, { Component } from 'react';

import './styles.scss';

import Counter from '../../components/Counter';
import Progressbar from '../../components/Progressbar';
import Button from '../../components/Button';

export default class Home extends Component {
  render() {
    return (
      <div className="timer">
        <Counter />
        <Progressbar progress={50} />
        <div className="timer-buttons">
          <Button value="Pomodore" />
          <Button value="Short break" />
          <Button value="Long break" />
        </div>
      </div>
    );
  }
}
