"use client";

import React, { useState, useEffect } from "react";
//import mcqoa2 from "components/mcqoa";
//import axios from "axios";

function App() {
  const [data, setData] = useState([] as any[]); // Declare a state variable to hold the data array
  const [count, setCount] = useState(0); // Declare a state variable to hold the current count

  // Fetch the data array from the web service
  async function fetchData() {
    const response = await fetch("/api/getMcqoas");
    const data = await response.json();
    setData(data);
  }

  // Use the useEffect hook to fetch the data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Use the useEffect hook to remove an element from the data array every two seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 0) {
        setData(data.slice(1)); // Remove the first element from the data array
        setCount(count + 1); // Update the count
      } else {
        clearInterval(interval); // Stop the interval when the data array is empty
        fetchData(); // Fetch new data from the web service
      }
    }, 2000);
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [data, count]);

  return (
    <div>
      <div>Elements remaining: {data.length}</div>
    </div>
  );
}

export default App;
