"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Q2 from "components/question2";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);

  const [isFetching, setIsFetching] = useState(true);

  const timerRef = useRef<NodeJS.Timeout>();
  const timerSwitch = useRef<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getMcqoas");
      const data = await response.json();
      setQuestions(data);
    };

    if (questions.length === 0 && isFetching) {
      fetchData();
    }
  }, [questions, isFetching]);

  const nextQ = useCallback(() => {
    setQuestions((prevQuestions) => prevQuestions.slice(1));
  }, []);
  useEffect(() => {
    if (isFetching) {
      if (questions.length) {
        setCurrentQuestion(questions[0]);

        timerRef.current = setTimeout(() => {
          nextQ();
          // setIsFetching(true);
        }, 1000);
      } else {
        setCurrentQuestion(null);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [questions, isFetching, nextQ]);

  function stopTimer() {
    console.log("stop");
    setIsFetching(false);
    timerSwitch.current = false;
    clearTimeout(timerRef.current);
  }

  function startTimer() {
    console.log("start");
    setIsFetching(true);
    timerSwitch.current = true;
    console.log(questions.length);
    timerRef.current = setTimeout(() => {
      nextQ();
      // setIsFetching(true);
    }, 1000);
  }

  return (
    <div>
      Counter: {questions.length}
      <hr />
      {questions.length > 0 && currentQuestion !== null && (
        <Q2
          question={currentQuestion.question}
          options={currentQuestion.sOpt}
        />
      )}
      <br />
      <button onClick={stopTimer}>Stop Timer</button> <br />
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
};

export default App;
