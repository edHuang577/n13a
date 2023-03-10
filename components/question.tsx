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

  return (
    <form onSubmit={handleSubmit}>
      <div>Question: {question}</div>
      <div>Option 1: {options[0]}</div>
      <div>Option 2: {options[1]}</div>
      <div>Option 3: {options[2]}</div>
      <div>Option 4: {options[3]}</div>
      <div>
        <input
          type="number"
          value={answer}
          onChange={handleChange}
          placeholder="Enter your answer"
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Question;
