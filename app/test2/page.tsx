"use client";

import React, { useState, useEffect } from "react";
import mcqoa2 from "components/mcqoa";
import axios from "axios";

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      // 這裡是抓取 web service 的程式碼
      // const response = await fetch("/api/getMcqoa");
      const response = await axios.get("/api/getMcqoa");

      let mm: mcqoa2;
      mm = response.data;

      setText(mm.answer);
    };

    const interval = setInterval(fetchText, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-xl">{text}</p>
    </div>
  );
}

export default App;
