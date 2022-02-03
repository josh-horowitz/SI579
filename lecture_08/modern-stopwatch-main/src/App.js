import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [timerAmount, setTimerAmount] = useState(0);
  const [buttonClicked, setButtonClicked] = useState('default');
  const [intervalId, setIntervalId] = useState(null);

  useEffect(()=> {
    if (buttonClicked === 'start') {
      const interval = setInterval(() => {
        setTimerAmount(previousAmount => previousAmount + 1)
      }, 1000);
      setIntervalId(interval);
    }  else {
      clearInterval(intervalId);
      if (buttonClicked === 'reset') {
        setTimerAmount(0);
      }
    }
  }, [buttonClicked]);

  return (
    <div className="App">
      <div className="display">
        <strong>TIME:</strong>
        <output>{timerAmount}</output>
      </div>
      <div className="btn-group">
          <button 
            onClick={() => {
              setButtonClicked('start')}}
            disabled={buttonClicked === 'start'}>
            Start
          </button>
          <button  
            onClick={() => setButtonClicked('stop')}
            disabled={['default', 'stop', 'reset'].includes(buttonClicked)}>
              Stop
          </button>
          <button  
            onClick={() => setButtonClicked('reset')}
            disabled={['default', 'reset'].includes(buttonClicked)}>
              Reset
            </button>
      </div>
    </div>
  );
}

export default App;
