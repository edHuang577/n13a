import React, { useState } from "react";

interface Props {
  question: string;
  options: string[];
}

const Question: React.FC<Props> = ({ question, options }) => {
  const [answer, setAnswer] = useState(""); // Declare a state variable to hold the answer

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setAnswer(value); // Update the answer when the input value changes
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Validate the answer here
  }

  return <div>Question {question}</div>;
};

export default Question;
