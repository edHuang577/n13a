"use client";

import Question from "components/question2";
import React, { useState, useEffect } from "react";
//import mcqoa2 from "components/mcqoa";
//import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([] as any[]); // Declare a state variable to hold the data array
  const [count, setCount] = useState(0); // Declare a state variable to hold the current count

  // Fetch the data array from the web service
  async function fetchQuestions() {
    const response = await fetch("/api/getMcqoas");
    const questions = await response.json();
    setQuestions(questions);
  }

  // Use the useEffect hook to fetch the data when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Use the useEffect hook to remove an element from the data array every two seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (questions.length > 0) {
        setQuestions(questions.slice(1)); // Remove the first element from the data array
        setCount(count + 1); // Update the count
      } else {
        clearInterval(interval); // Stop the interval when the data array is empty
        fetchQuestions(); // Fetch new data from the web service
      }
    }, 2000);
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [questions, count]);

  return (
    <div>
      <div>Elements remaining: {questions.length}</div> // Display the current
      count
      {questions.length > 0 && (
        <Question
          question={questions[0].question}
          options={questions[0].sOpt}
        />
      )}
    </div>
  );
}

export default App;
