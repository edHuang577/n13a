"use client";

import React, { useState, useEffect } from "react";
import mcqoa2 from "components/mcqoa";
import axios from "axios";

function App() {
  const [mcqArr, setMcqArr] = useState<mcqoa2[]>([]);
  const fetchData = async () => {
    const response = await axios.get("/api/getMcqoas");
    let respData: mcqoa2[];
    respData = response.data;
    setMcqArr(respData);
  };
  if (mcqArr.length <= 0) {
    fetchData();
  }
  useEffect(() => {
    // const interval = setInterval(fetchText, 2000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-xl">{mcqArr.length}</p>
    </div>
  );
}

export default App;
