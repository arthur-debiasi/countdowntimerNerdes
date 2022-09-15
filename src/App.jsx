import React, { Component } from 'react'
import CountdownSettings from './components/CountdownSettings'
import CountdownTimer from './components/CountdownTimer'
import ringer from './data/boraBill.mp3'
import music from './data/CTT-musics.mp3'
import "./App.css"

export default class App extends Component {
  state = {
    isCountdownTimerOn: false,
    seconds: 59,
    minutes: 1  ,
    timerId: 0,
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({ [name]: Number(value) })
  }

  handleClick = () => {
    this.setState(({ isCountdownTimerOn, minutes }) => ({ 
      isCountdownTimerOn: !isCountdownTimerOn,
      minutes: minutes -1 }))
  }

  countdownTimerMount = () => {
    const audio = new Audio(music);
    audio.play();
    console.log('Did mount');
    const INTERVAL = 1000;
    const timerId = setInterval(() => {
      this.setState(({seconds}) => ({ seconds: seconds <= 10 ? `0${seconds - 1}` : seconds - 1 }));
    }, INTERVAL);
    this.setState({ timerId });
  }

  countdownTimerUpdate = () => {
      this.setState(({ minutes }) => ({
        seconds: 59,
        minutes: minutes - 1,
      }));
      const { minutes, seconds, timerId } = this.state;
      // console.log(minutes, seconds);
      if (minutes === 0 && seconds === '0-1') {
        this.setState({ isCountdownTimerOn: false })
        clearInterval(timerId)
      };
    // }
  }

  countdownTimerUnmount = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
    this.setState({
      seconds: 59,
      minutes: 1,
      timerId: 0, 
    })
    window.location.reload(); 
    console.log('Desmontado');
  }

  componentDidMount(){
    const audio = new Audio(ringer);
    audio.play();
  }
  render() {
    const { isCountdownTimerOn, seconds, minutes } = this.state;
    return (
      <div className='container'>
        <h1>Intervalo da Turma 24 <br />Tribo Nerdes</h1>
        { isCountdownTimerOn ? (
        <CountdownTimer
          countdownTimerMount= { this.countdownTimerMount }
          countdownTimerUpdate={ this.countdownTimerUpdate }
          countdownTimerUnmount={ this.countdownTimerUnmount }
          minutes={ minutes }
          seconds={ seconds }
        />
        ) : (
        <CountdownSettings
          minutes= { minutes }
          seconds={ seconds }
          handleChange={ this.handleChange }
        />
        ) }
        <button 
          type="button"
          className='button'
          onClick={ this.handleClick }
        >
          { isCountdownTimerOn ? 'Recomeçar' : 'Começar' }
        </button>
        
        
      </div>
    )
  }
}
