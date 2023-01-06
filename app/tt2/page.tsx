"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Q2 from "components/question2";
const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);

  const [isFetching, setIsFetching] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  const timerSwitch = useRef<boolean>(false);

  const timerinit = () => {};

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getMcqoas");
      const data = await response.json();
      // setQuestions(data);
      setQuestions([...questions, ...data]);
      //[...items, item]
    };
    console.log("test");
    if (isFetching) {
      fetchData();
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    const showNextQuestion = () => {
      setCurrentQuestion(questions[0]);
      timerRef.current = setTimeout(() => {
        setQuestions((prevQuestions) => prevQuestions.slice(1));
      }, 300);
    };
    console.log("test2");
    if (timerSwitch.current && questions.length !== 0) {
      console.log("switch value!");
      showNextQuestion();
    }
    if (questions.length <= 3) {
      setIsFetching(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [questions]);

  function stopTimer() {
    console.log("stop");
    timerSwitch.current = false;
    clearTimeout(timerRef.current);
  }

  function startTimer() {
    timerSwitch.current = true;
    console.log("start");
    console.log(questions.length);
    setIsFetching(true);
    timerinit();
  }
  function cleanQuestions() {
    setQuestions([]);
  }

  function single() {
    setQuestions((prevQuestions) => prevQuestions.slice(1));
  }
  return (
    <div>
      Counter: {questions.length}
      <br />
      <hr />
      {questions.length > 0 && currentQuestion !== null && (
        <Q2
          question={currentQuestion.question}
          options={currentQuestion.sOpt}
        />
      )}
      <hr />
      <button onClick={stopTimer}>Stop Timer</button> <br />
      <button onClick={startTimer}>Start Timer</button>
      <br />
      <button onClick={cleanQuestions}>clean all question</button>
      <br />
      <button onClick={single}>single</button>
    </div>
  );
};

export default App;
