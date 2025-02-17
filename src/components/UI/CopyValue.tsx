"use client";

import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type CopyValueProps = {
  value: string;
  className?: string;
};

export default function CopyValue({ value, className = "" }: CopyValueProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <span className="inline-flex items-center gap-1 group border-2 border-sand-700 rounded-md p-1">
      <code className={`font-mono ${className}`}>{value}</code>
      <button
        onClick={handleCopy}
        className="text-sand-600 hover:text-sand-800 transition-colors inline-flex items-center"
        aria-label={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? (
          <CheckIcon className="w-4 h-4 inline" />
        ) : (
          <ClipboardIcon className="w-4 h-4 inline" />
        )}
      </button>
    </span>
  );
}
