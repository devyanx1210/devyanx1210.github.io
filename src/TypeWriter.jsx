// Typewriter.jsx
import React, { useState, useEffect } from "react";

export default function Typewriter({ text = "", speed = 120 }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorBlink);
    };
  }, [text, speed]);

  return (
    <h1>
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </h1>
  );
}
