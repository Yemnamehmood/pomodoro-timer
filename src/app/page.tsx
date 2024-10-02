'use client'
import { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [isWork, setIsWork] = useState(true);
  const [isRunning, setIsRunning] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Set default work time (25 min)
  
  const workDuration = 25 * 60; // Work time (25 min)
  const breakDuration = 5 * 60; // Break time (5 min)

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined; 

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval!); // Use the non-null assertion operator '!' to indicate that interval will not be undefined here
    }

    if (timeLeft === 0) {
      setIsWork(!isWork);
      setTimeLeft(isWork ? breakDuration : workDuration);
    }

    return () => clearInterval(interval!); 
  }, [isRunning, timeLeft, isWork]);

  // Convert seconds to minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="container">
      <h1 className="title">Pomodoro Timer</h1>
      <div className="timer">
        <h2>{isWork ? 'Work Session' : 'Break Session'}</h2>
        <p className="time">{formatTime(timeLeft)}</p>
        <div className="controls">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => setTimeLeft(isWork ? workDuration : breakDuration)}>
            Reset
          </button>
        </div>
      </div>
      <footer>
        <p>&copy; All rights reserved. Pomodoro Timer by Yemna Mehmood</p>
      </footer>
    </div>
  );
};

export default PomodoroTimer;
