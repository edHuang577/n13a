"use client";
import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);

  const timerRef = useRef<NodeJS.Timeout>();
  const timerSwitch = useRef<boolean>(false);

  const timerinit = () => {
    timerRef.current = setTimeout(() => {
      setCounter(counter + 1);
      // setRunning(false);
    }, 300);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getMcqoas");
      const data = await response.json();
      setQuestions(data);
    };

    if (questions.length === 0 && timerSwitch) {
      fetchData();
    }
  }, [questions, timerSwitch]);

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
      Counter: {questions.length}
      <br />
      <button onClick={stopTimer}>Stop Timer</button> <br />
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
};

export default App;
