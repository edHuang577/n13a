"use client";
import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);
  let timer: NodeJS.Timeout;
  let timerRunning = false;

  const timerinit = () => {
    timer = setTimeout(() => {
      setCounter(counter + 1);
      timerRunning = false;
      // setRunning(false);
    }, 1000);
  };

  useEffect(() => {
    if (timerRunning) {
      // cancel the previous timer
      clearTimeout(timer);
    } else {
      timerRunning = true;
      // setRunning(true);
      timerinit();
      // return () => clearTimeout(timer);
    }
  }, [counter]);

  function stopTimer() {
    console.log("stop");
    timerRunning = false;
    clearTimeout(timer);
  }

  function startTimer() {
    timerRunning = true;
    // setRunning(true);
    timerinit();
  }

  return (
    <div>
      Counter: {counter}
      <br />
      <button onClick={stopTimer}>Stop Timer</button> <br />
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
};

export default App;
