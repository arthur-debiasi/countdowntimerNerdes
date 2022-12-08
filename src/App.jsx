import React, { Component } from 'react'
import CountdownSettings from './components/CountdownSettings'
import CountdownTimer from './components/CountdownTimer'
import ringer from './data/rooster.wav'
// import music from './data/CTT-musics.mp3'
import "./App.css"

export default class App extends Component {
  state = {
    isCountdownTimerOn: false,
    tribo: 1,
    seconds: 59,
    minutes: 1  ,
    timerId: 0,
    volume: 1
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({ [name]: Number(value) })
  }

  handleClick = () => {
    this.setState(({ isCountdownTimerOn, minutes }) => ({ 
      isCountdownTimerOn: !isCountdownTimerOn,
      minutes: minutes -1 }), () => {
        const { isCountdownTimerOn } =  this.state;
        if (!isCountdownTimerOn) { 
          this.audio2.play();
          console.log('play');
        } else {
          this.audio2.setAttribute('src', ringer);
          this.audio2.load();
          console.log('pause');
        }
      })
  }
  
  countdownTimerMount = () => {
    const INTERVAL = 1000;
    this.timerId = setInterval(() => {
      this.setState(({seconds}) => ({ seconds: seconds <= 10 ? `0${seconds - 1}` : seconds - 1 }));
    }, INTERVAL);
  }

  countdownTimerUpdate = () => {
      this.setState(({ minutes }) => ({
        seconds: 59,
        minutes: minutes - 1,
      }));
      const { minutes, seconds } = this.state;
      // console.log(minutes, seconds);
      if (minutes === 0 && seconds === '0-1') {
        this.setState({ isCountdownTimerOn: false })
        clearInterval(this.timerId)
      };
    // }
  }

  countdownTimerUnmount = () => {
    // const { timerId } = this.state;
    clearInterval(this.timerId);
    this.setState({
      seconds: 59,
      minutes: 1,
      timerId: 0, 
    })
    this.audio2.play();
    // window.location.reload(); 
    // console.log('Desmontado');
  }

  componentDidMount(){
    this.audio2 = new Audio(ringer);
    // const audio = new Audio(ringer);
    // // audio.play();
  }

  handleVolumeUp = () => {
    this.setState(({volume}) => ({
      volume: volume === 1 ? 1 : +(volume + 0.1).toFixed(2)
    }));
    console.log('+');
  }

  handleVolumeDown = () => {
    this.setState(({volume}) => ({
      volume: volume === 0 ? 0 : +(volume - 0.1).toFixed(2)
    }))
    console.log('-');
  }
  render() {
    const { isCountdownTimerOn, seconds, minutes, tribo, volume } = this.state;
    return (
      <div className='container'>
        <label htmlFor="tribo-a">
          Tribo Atanes
          {' '}
          <input type="radio" name="tribo" id="tribo-a" value={'0'} onChange={this.handleChange} />
          </label>
          <label htmlFor="tribo-b">
          Tribo Nerdes
          {' '}
          <input type="radio" name="tribo" id="tribo-b" value={'1'} onChange={this.handleChange} />
          </label>
          {tribo ? <h1>Intervalo da Turma 24 <br />Tribo Nerdes</h1> : <h1>Intervalo da Turma 24 <br />Tribo Atanes</h1>}
        { isCountdownTimerOn ? (
        <CountdownTimer
          countdownTimerMount= { this.countdownTimerMount }
          countdownTimerUpdate={ this.countdownTimerUpdate }
          countdownTimerUnmount={ this.countdownTimerUnmount }
          minutes={ minutes }
          seconds={ seconds }
          volume={ volume }
          handleVolumeUp={ this.handleVolumeUp }
          handleVolumeDown={ this.handleVolumeDown }
        />
        ) : (
        <CountdownSettings
          tribo={ tribo }
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
        <h6>Desenvolvido por Arthur Debiasi - T24B</h6>
        
      </div>
    )
  }
}
