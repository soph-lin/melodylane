"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/style";

interface AutocompleteProps {
  timeType: string;
  seasonYear?: string;
  startDate?: string;
  endDate?: string;
  customDay?: string;
  onTimeTypeChange: (timeType: string) => void;
  onSeasonYearChange?: (year: string) => void;
  onDateRangeChange?: (start: string, end: string) => void;
  onCustomDayChange?: (day: string) => void;
  options: string[];
}

export default function Autocomplete({
  timeType,
  seasonYear: initialSeasonYear = "",
  startDate = "",
  endDate = "",
  customDay = "",
  onTimeTypeChange,
  onSeasonYearChange,
  onDateRangeChange,
  onCustomDayChange,
  options,
}: AutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSeasonInput, setShowSeasonInput] = useState(false);
  const [seasonYear, setSeasonYear] = useState(initialSeasonYear);
  const [showInitialAnimation, setShowInitialAnimation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCustomPeriod, setShowCustomPeriod] = useState(false);
  const [showCustomDay, setShowCustomDay] = useState(false);

  useEffect(() => {
    setSeasonYear(initialSeasonYear);
  }, [initialSeasonYear]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (measureRef.current && inputRef.current) {
      inputRef.current.style.width = measureRef.current.offsetWidth + "px";
    }
  }, [timeType]);

  useEffect(() => {
    if (timeType) {
      // Add a longer delay for all inputs to ensure the suggestion animation completes first
      const delay = 600; // Increased from 500 to 600ms

      if (["spring", "summer", "fall", "winter"].includes(timeType)) {
        const timer = setTimeout(() => {
          setShowSeasonInput(true);
        }, delay);
        return () => clearTimeout(timer);
      } else if (timeType === "custom period") {
        const timer = setTimeout(() => {
          setShowCustomPeriod(true);
        }, delay);
        return () => clearTimeout(timer);
      } else if (timeType === "custom day") {
        const timer = setTimeout(() => {
          setShowCustomDay(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setShowSeasonInput(false);
        setShowCustomPeriod(false);
        setShowCustomDay(false);
      }
    }
  }, [timeType]);

  useEffect(() => {
    // Start animation after initial render
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setShowInitialAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showInitialAnimation) {
      const timer = setTimeout(() => {
        setShowInitialAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showInitialAnimation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onTimeTypeChange?.(newValue);

    // Filter suggestions based on input
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(newValue.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);

    if (options.includes(newValue)) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onTimeTypeChange?.(suggestion);
    setShowSuggestions(false);

    // Reset these states immediately when suggestion is clicked
    setShowSeasonInput(false);
    setShowCustomPeriod(false);
    setShowCustomDay(false);

    // Wait for the time type animation to complete (500ms) before showing additional input
    setTimeout(() => {
      if (["spring", "summer", "fall", "winter"].includes(suggestion)) {
        setShowSeasonInput(true);
      } else if (suggestion === "custom period") {
        setShowCustomPeriod(true);
      } else if (suggestion === "custom day") {
        setShowCustomDay(true);
      }
    }, 500);

    if (inputRef.current) {
      inputRef.current.classList.add("animate-typeIn");
      setTimeout(() => {
        inputRef.current?.classList.remove("animate-typeIn");
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  const handleSeasonYearKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ((e.key === "Backspace" || e.key === "Delete") && !seasonYear) {
      onTimeTypeChange("");
      setShowSeasonInput(false);
    }
  };

  const handleCustomPeriodKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    isEndDate: boolean
  ) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      isEndDate &&
      !endDate
    ) {
      onTimeTypeChange("");
      setShowCustomPeriod(false);
    }
  };

  const handleCustomDayKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Backspace" || e.key === "Delete") && !customDay) {
      onTimeTypeChange("");
      setShowCustomDay(false);
    }
  };

  const handleFocus = () => {
    if (timeType) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(timeType.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(options);
    }
    setShowSuggestions(true);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="w-full bg-sand-50/50 border border-sand-200 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-sand-300 transition-all">
        <div className="flex flex-row items-center">
          <span className="text-sand-600 whitespace-nowrap">take me to</span>
          <div
            className={cn(
              "relative inline-block",
              isLoaded && showInitialAnimation && "animate-typeIn",
              !isLoaded && "invisible"
            )}
          >
            <div
              ref={measureRef}
              aria-hidden="true"
              className="invisible absolute whitespace-pre"
            >
              {timeType || "time"}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={timeType || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="bg-transparent border-none outline-none min-w-[6px] mx-3"
              placeholder="time"
            />
          </div>

          {showSeasonInput &&
            ["spring", "summer", "fall", "winter"].includes(timeType) && (
              <div
                className={cn(
                  "flex flex-row gap-[6px] items-center",
                  "animate-typeIn",
                  !isLoaded && "invisible"
                )}
              >
                <span className="text-sand-600">of</span>
                <input
                  type="number"
                  min="2006"
                  step="1"
                  placeholder="year"
                  value={seasonYear || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSeasonYear(newValue);
                    onSeasonYearChange?.(newValue);
                  }}
                  onKeyDown={handleSeasonYearKeyDown}
                  onFocus={() => setShowSuggestions(false)}
                  className="w-20 bg-transparent border-none outline-none ml-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&:--webkit-inner-spin-button]:appearance-none"
                />
              </div>
            )}

          {timeType === "custom period" && showCustomPeriod && (
            <div
              className={cn(
                "flex flex-row items-center gap-2",
                "animate-typeIn",
                !isLoaded && "invisible"
              )}
            >
              <span className="text-sand-600">from</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onDateRangeChange?.(e.target.value, endDate)}
                className="bg-transparent border-none outline-none"
              />
              <span className="text-sand-600">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onDateRangeChange?.(startDate, e.target.value)}
                onKeyDown={(e) => handleCustomPeriodKeyDown(e, true)}
                className="bg-transparent border-none outline-none"
              />
              <input
                type="text"
                className="w-0 p-0 border-none outline-none"
                onKeyDown={(e) => handleCustomPeriodKeyDown(e, true)}
              />
            </div>
          )}

          {timeType === "custom day" && showCustomDay && (
            <div
              className={cn(
                "flex flex-row items-center gap-2",
                "animate-typeIn",
                !isLoaded && "invisible"
              )}
            >
              <span className="text-sand-600">on</span>
              <input
                type="date"
                value={customDay}
                onChange={(e) => onCustomDayChange?.(e.target.value)}
                onKeyDown={handleCustomDayKeyDown}
                className="bg-transparent border-none outline-none"
              />
              <input
                type="text"
                className="w-0 p-0 border-none outline-none"
                onKeyDown={handleCustomDayKeyDown}
              />
            </div>
          )}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2">
          <div className="animate-slideIn bg-sand-50/95 backdrop-blur-sm border border-sand-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto scrollbar-custom">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-sand-100/80 transition-colors truncate text-sand-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
