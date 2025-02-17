import { useState, useEffect } from "react";
import SPLASH_ICONS from "@/utils/splash-icons";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "Loading...",
}: LoadingScreenProps) {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % SPLASH_ICONS.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <pre className="font-mono whitespace-pre">{SPLASH_ICONS[iconIndex]}</pre>
      <p className="text-lg">{message}</p>
    </div>
  );
}
