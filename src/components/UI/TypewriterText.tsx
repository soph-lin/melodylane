"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  className = "",
  speed = 30,
  onComplete,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div
      className={`font-mono text-sm h-8 flex items-center justify-center ${className}`}
    >
      {displayText}
      <span className="inline-block w-[2px] h-[1.2em] ml-1 bg-current animate-[blink_1s_steps(1)_infinite]">
        &nbsp;
      </span>
    </div>
  );
}
