import React, { useState, useRef, useEffect } from "react";

interface Props {
  question: string;
  options: string[];
}

const Question: React.FC<Props> = ({ question, options }) => {
  const [answer, setAnswer] = useState(""); // Declare a state variable to hold the answer
  const inputRef = useRef<HTMLInputElement>(null); // Declare a ref to the input element

  // Function to send the answer to the web service
  async function sendAnswer(answer: string) {
    const response = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify({ answer }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setAnswer(value); // Update the answer when the input value changes
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Validate the answer here
    sendAnswer(answer); // Send the answer to the web service
  }

  // Use the useEffect hook to set the focus on the input element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Use the useEffect hook to send the answer to the web service after two seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      sendAnswer(answer);
    }, 2000);
    return () => clearTimeout(timeout); // Clean up the timeout when the component unmounts
  }, [answer]);

  return (
    <form onSubmit={handleSubmit}>
      <div>Question: {question}</div>
      <hr />
      <div>Option 1: {options[0]}</div>
      <div>Option 2: {options[1]}</div>
      <div>Option 3: {options[2]}</div>
      <div>Option 4: {options[3]}</div>
      <div>
        <input
          ref={inputRef} // Add the ref to the input element
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
