import React, { Component } from 'react';
import { Map } from 'immutable';
import Sound from 'react-sound';

import './styles.scss';

import Header from './Header';
import { AboutContainer, About } from './About';
import Footer from './Footer';
import Counter from '../../components/Counter';
import Progressbar from '../../components/Progressbar';
import ButtonContainer from '../../components/ButtonContainer';
import Button from '../../components/Button';
import pkg from '../../../package.json';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.timerFinished = this.timerFinished.bind(this);
    this.alertFinished = this.alertFinished.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);

    this.state = {
      timer: Map({
        currentTime: 0,
        timerStartedAt: 0,
        isRunning: false,
        isPaused: false,
      }),
      aboutVisible: false,
      soundStatus: Sound.status.STOPPED,
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
        this.timerFinished();
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

  timerFinished() {
    this.setState({ soundStatus: Sound.status.PLAYING });
  }

  alertFinished() {
    this.setState({ soundStatus: Sound.status.STOPPED });
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

    let value;
    switch (val) {
      case 'Pomodore':
        value = 5000;
        break;
      case 'Short break':
        value = 300000;
        break;
      case 'Long break':
        value = 900000;
        break;
      default:
        value = null;
    }

    if (value) {
      this.setState(({ timer }) => ({
        timer: timer.set('timerStartedAt', value),
      }));
    }

    this.startTimer(value || this.state.timer.get('currentTime'));
  }

  handlePause() {
    this.pauseTimer();
  }

  handleReset() {
    this.resetTimer();
  }

  toggleAbout(e) {
    e.preventDefault();
    const visible = this.state.aboutVisible;
    this.setState({ aboutVisible: !visible });
  }

  buttons() {
    const isRunning = this.state.timer.get('isRunning');
    const isPaused = this.state.timer.get('isPaused');

    const pomodore = <Button key="pomodore" text="Pomodore" handleClick={this.handleStart} popover="25 min" />;
    const short = <Button key="short" text="Short break" handleClick={this.handleStart} popover="5 min" />;
    const long = <Button key="long" text="Long break" handleClick={this.handleStart} popover="15 min" />;
    const resume = <Button key="resume" text="Resume" handleClick={this.handleStart} />;
    const pause = <Button key="pause" text="Pause" handleClick={this.handlePause} />;
    const reset = <Button key="reset" text="Reset" handleClick={this.handleReset} />;

    if (!isRunning) return [pomodore, short, long];
    return [isPaused ? resume : pause, reset];
  }

  render() {
    const currentTime = this.state.timer.get('currentTime');
    const timerStartedAt = this.state.timer.get('timerStartedAt');
    const progress = timerStartedAt > 0 ?
      ((currentTime / timerStartedAt) * 100).toFixed(2) :
      (0).toString();

    return (
      <div className="timer">
        <Header title={pkg.name} description={pkg.description} />
        <Counter time={this.state.timer.get('currentTime')} />
        <Progressbar progress={progress} />
        <Sound
          url="src/static/alert.mp3"
          playStatus={this.state.soundStatus}
          onFinishedPlaying={this.alertFinished}
        />
        <ButtonContainer>
          {this.buttons()}
        </ButtonContainer>
        <Footer
          title={pkg.name}
          version={pkg.version}
          authorLink={pkg.homepage.url}
          author={pkg.author}
          handleAboutClick={this.toggleAbout}
        />
        <AboutContainer>
          {this.state.aboutVisible ? <About /> : null}
        </AboutContainer>
      </div>
    );
  }
}
