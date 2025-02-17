"use client";

import { cn } from "@/utils/style";
import { useEffect, useState } from "react";

interface CascadingTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  delayMs?: number;
  onComplete?: () => void;
}

export default function CascadingText({
  text,
  className,
  letterClassName,
  delayMs = 100,
  onComplete,
}: CascadingTextProps) {
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>(
    new Array(text.length).fill(false)
  );

  useEffect(() => {
    text.split("").forEach((_, index) => {
      setTimeout(() => {
        setVisibleLetters((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        if (index === text.length - 1 && onComplete) {
          setTimeout(onComplete, 500);
        }
      }, index * delayMs);
    });
  }, [text, delayMs, onComplete]);

  return (
    <div className={cn("flex", className)}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={cn(letterClassName, letter === " " && "mr-[1ch]")}
          style={{
            transform: visibleLetters[index]
              ? "translateY(0)"
              : "translateY(-100%)",
            opacity: visibleLetters[index] ? 1 : 0,
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "500ms",
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
