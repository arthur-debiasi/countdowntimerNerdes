import React from 'react';
// import ringer from '../data/boraBill.mp3'
// import music from '../data/CTT-musics.mp3'
// import music from '../data/linkin-park-mashups.mp3'
// import './CountdownTimer.css'

class CountdownTimer extends React.Component {

  componentDidMount() {
    const { countdownTimerMount, handlePlay } = this.props;
    countdownTimerMount()
    handlePlay()
    // this.audio = new Audio(music);
    // this.audio.play();
  }

  componentDidUpdate({seconds}) {
    const MIN_LIMIT = '00';
    const { countdownTimerUpdate } = this.props;
    if (seconds === MIN_LIMIT) {
    countdownTimerUpdate();
    }
  }

  componentWillUnmount() {
    const { countdownTimerUnmount, handleStop } = this.props;
    countdownTimerUnmount();
    handleStop();
    // this.audio2 = new Audio(ringer);
    // this.audio2.play();
    // this.audio.pause();
  }

  render() {
    const { seconds, minutes, volume, handleVolumeUp, handleVolumeDown } = this.props;
    // console.log('Render');
    // console.log(minutes, seconds);
    return (
      <div className='clock'>
        <h2 className='timer'>{`${minutes} : ${seconds}`}</h2>
        <label>Volume: {100 * volume}% {' '}</label>
        <span className='volume-btn-container'>
        <button 
            type='button'
            className='button'
            onClick={ handleVolumeUp }
            >
            +
          </button>
          <button 
            type='button'
            className='button'
            onClick={ handleVolumeDown }
            >
            -
          </button>
        </span>
      </div>
    );
  }
}

export default CountdownTimer;