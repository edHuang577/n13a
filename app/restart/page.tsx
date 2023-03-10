"use client";
import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const timerSwitch = useRef<boolean>(false);

  const timerinit = () => {
    timerRef.current = setTimeout(() => {
      setCounter(counter + 1);
      // setRunning(false);
    }, 300);
  };

  useEffect(() => {
    if (timerSwitch.current) {
      timerinit();
      return () => clearTimeout(timerRef.current);
    }
  });

  function stopTimer() {
    console.log("stop");
    timerSwitch.current = false;
    clearTimeout(timerRef.current);
  }

  function startTimer() {
    timerSwitch.current = true;

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
