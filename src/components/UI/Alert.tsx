import { useEffect, useState } from "react";
import Portal from "./Portal";

interface AlertProps {
  message: string;
  onClose: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <Portal>
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-sand-500 text-sand-50 px-6 py-3 rounded-lg shadow-lg 
          transition-all duration-500 w-full max-w-md
          ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          }`}
      >
        <div className="animate-pulse">{message}</div>
      </div>
    </Portal>
  );
}
