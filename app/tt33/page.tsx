"use client";

import React, { useState, useEffect } from "react";
import Q2 from "components/question2";
// interface Question {
//   question: string;
//   options: string[];
// }

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
  const [isFetching, setIsFetching] = useState(true);

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

  const nextQ = () => {
    setQuestions((prevQuestions) => prevQuestions.slice(1));
  };
  useEffect(() => {
    let timer: number;
    if (questions.length) {
      setCurrentQuestion(questions[0]);
      timer = window.setTimeout(() => {
        nextQ();
      }, 2000);
    } else {
      setCurrentQuestion(null);
    }
    return () => window.clearTimeout(timer);
  }, [questions]);

  const handleStop = () => {
    setQuestions([]);
    setIsFetching(false);
  };
  const handleStart = () => {
    setIsFetching(true);
  };

  return (
    <div>
      <div>Number of questions: {questions.length}</div>
      <hr />
      {questions.length > 0 && currentQuestion !== null && (
        <Q2
          question={currentQuestion.question}
          options={currentQuestion.sOpt}
        />
      )}
      <button onClick={handleStop}>Stop</button>{" "}
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default App;
