import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-w-[200px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full bg-sand-50/50 border border-sand-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sand-300 focus:outline-none transition-all hover:bg-sand-100/50 ${className}`}
      >
        <span className="truncate mr-2 text-sand-700">{value}</span>
        <ChevronDownIcon
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 text-sand-600 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2">
          <div className="animate-slideIn bg-sand-50/95 backdrop-blur-sm border border-sand-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto scrollbar-custom">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-sand-100/80 transition-colors truncate
                  ${
                    value === option
                      ? "bg-sand-200/80 text-sand-800"
                      : "text-sand-700"
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
