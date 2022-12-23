"use client";

import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      // 這裡是抓取 web service 的程式碼
      const response = await fetch("/api/hello");
      const data = await response.text();
      setText(data);
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
