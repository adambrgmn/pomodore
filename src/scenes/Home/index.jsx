import React, { Component } from 'react';
import { Map } from 'immutable';

import './styles.scss';

import Counter from '../../components/Counter';
import Progressbar from '../../components/Progressbar';
import ButtonContainer from '../../components/ButtonContainer';
import Button from '../../components/Button';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      timer: Map({
        currentTime: 0,
        timerStartedAt: 0,
        isRunning: false,
        isPaused: false,
      }),
    };
  }

  startTimer(time) {
    this.setState(({ timer }) => ({
      timer: timer
        .set('currentTime', time)
        .set('isRunning', true)
        .set('isPaused', false),
    }));

    this.setState(({ timer }) => ({
      timer: timer.set('currentTime', time),
    }));

    this.timer = setInterval(() => {
      if (this.state.timer.get('currentTime') <= 0) {
        this.resetTimer();
      } else {
        this.setState(({ timer }) => ({
          timer: timer.update('currentTime', (v) => v - 1000),
        }));
      }
    }, 1000);
  }

  pauseTimer() {
    if (this.timer) clearInterval(this.timer);
    this.setState(({ timer }) => ({
      timer: timer.set('isPaused', true),
    }));
  }

  resetTimer() {
    if (this.timer) clearInterval(this.timer);

    this.setState(({ timer }) => ({
      timer: timer
        .set('currentTime', 0)
        .set('timerStartedAt', 0)
        .set('isRunning', false)
        .set('isPaused', false),
    }));
  }

  handleStart(val) {
    if (this.timer) clearInterval(this.timer);

    if (val) {
      this.setState(({ timer }) => ({
        timer: timer.set('timerStartedAt', val),
      }));
    }

    this.startTimer(val || this.state.timer.get('currentTime'));
  }

  handlePause() {
    this.pauseTimer();
  }

  handleReset() {
    this.resetTimer();
  }

  render() {
    const currentTime = this.state.timer.get('currentTime');
    const timerStartedAt = this.state.timer.get('timerStartedAt');
    const progress = timerStartedAt > 0 ? ((currentTime / timerStartedAt) * 100).toFixed(2) : 0;

    return (
      <div className="timer">
        <Counter time={this.state.timer.get('currentTime')} />
        <Progressbar progress={progress} />
        <ButtonContainer>
          <Button
            text="Pomodore"
            value={1500000}
            handleClick={this.handleStart}
            show={!this.state.timer.get('isRunning')}
          />
          <Button
            text="Short break"
            value={300000}
            handleClick={this.handleStart}
            show={!this.state.timer.get('isRunning')}
          />
          <Button
            text="Long break"
            value={900000}
            handleClick={this.handleStart}
            show={!this.state.timer.get('isRunning')}
          />
          <Button
            text="Resume"
            handleClick={this.handleStart}
            show={this.state.timer.get('isPaused')}
          />
          <Button
            text="Pause"
            handleClick={this.handlePause}
            show={this.state.timer.get('isRunning') && !this.state.timer.get('isPaused')}
          />
          <Button
            text="Reset"
            handleClick={this.handleReset}
            show={this.state.timer.get('isRunning')}
          />
        </ButtonContainer>
      </div>
    );
  }
}
