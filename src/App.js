import React, { Component } from 'react';
import Sound from 'react-sound';
import TimerDisplay from './components/TimerDisplay';
import './App.css';

class App extends Component {
  state = {
    timeRemaining: 0,
    running: false
  };

  startTime = 90;
  timer = 0;
  
  componentDidMount() {
    this.setState({timeRemaining: this.startTime})
  }
  
  reset = () => {
    document.body.style.backgroundColor = "#2e0603";
    this.setState({
      timeRemaining: this.startTime,
      running: false
    })
    clearInterval(this.timer);
  }
  
  toggleTimer = () => {
    if(this.state.running) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }
  
  startTimer = () => {
    this.timer = setInterval(this.tick, 1000);
    this.setState({
      running: true
    })
  }
  
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ running: false });
  }
  
  punish = () => {
    const {timeRemaining} = this.state;
    let newTime = timeRemaining-5;
    if(newTime < 0) {
      this.kill();
      newTime=0;
    }
    this.setState({timeRemaining: newTime})
  }
  
  tick = () => {
    this.setState((state) => {
        if(state.timeRemaining <= 1) {
          this.kill();
        }
        return {timeRemaining: state.timeRemaining < 0 ? 0 : state.timeRemaining - 1}
    })
  }
  
  kill = () => {
    this.stopTimer();
    document.body.style.backgroundColor = "red";
  }
  
  render() {
    const {running, timeRemaining} = this.state;
    return (
      <div className="App">
      <TimerDisplay timeRemaining={timeRemaining}/>
      <button className="button" onClick={this.reset}>Reset</button>
      <button className="button" onClick={this.toggleTimer}>{running ? 'Stop': 'Start'}</button>
      <button className="button" onClick={this.punish}>Fout</button>
      <Sound
        url="buzzer.mp3"
        playStatus={timeRemaining === 0 ? Sound.status.PLAYING : Sound.status.STOPPED}
      />
      </div>
    );
  }
}

export default App;
