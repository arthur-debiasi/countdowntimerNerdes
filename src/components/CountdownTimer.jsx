import React from 'react';
import './CountdownTimer.css'

class CountdownTimer extends React.Component {

  componentDidMount() {
    const { countdownTimerMount } = this.props;
    countdownTimerMount()
  }

  componentDidUpdate({seconds}) {
    const MIN_LIMIT = '00';
    const { countdownTimerUpdate } = this.props;
    if (seconds === MIN_LIMIT) {
    countdownTimerUpdate();
    }
  }

  componentWillUnmount() {
    const { countdownTimerUnmount } = this.props;
    countdownTimerUnmount();
  }

  render() {
    const { seconds, minutes } = this.props;
    console.log('Render');
    console.log(minutes, seconds);
    return (
      <div className='clock'>
        <h2 className='timer'>{`${minutes} : ${seconds}`}</h2>
      </div>
    );
  }
}

export default CountdownTimer;