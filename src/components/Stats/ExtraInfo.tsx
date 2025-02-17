"use client";

import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Portal from "@/components/UI/Portal";

export default function ExtraInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sand-600 hover:text-sand-800 transition-colors ml-2 inline-flex items-center"
        aria-label="Show information"
      >
        <InformationCircleIcon className="w-5 h-5" />
      </button>

      {/* Modal in Portal */}
      {isOpen && (
        <Portal>
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Content */}
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">About Seasons</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Spring: March 1 - May 31</li>
                    <li>Summer: June 1 - August 31</li>
                    <li>Fall: September 1 - November 30</li>
                    <li>Winter: December 1 - February 28/29</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">About the Data</h3>
                  <p>
                    When using your Spotify data, the statistics are calculated
                    based on your streaming history. The sample data is provided
                    for demonstration purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Privacy Note</h3>
                  <p>
                    Your Spotify data is processed locally in your browser. No
                    data is stored or transmitted to any servers.
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-4 bg-sand-600 text-white py-2 px-4 rounded-lg hover:bg-sand-700 transition-colors"
                >
                  k, cool
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
