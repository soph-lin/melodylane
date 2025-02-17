import { useState } from "react";
import { SpotifyTrack, SpotifyStats } from "@/types/stats";
import DataCloud from "./DataCloud/DataCloud";
import Timeline from "./Timeline/Timeline";

type DisplayType = "review" | "cloud" | "timeline";

interface SongDisplayProps {
  tracks: SpotifyTrack[];
  results: SpotifyStats;
}

export default function SongDisplay({ tracks, results }: SongDisplayProps) {
  const [activeTab, setActiveTab] = useState<DisplayType>("review");

  return (
    <div className="mt-8">
      <div className="flex gap-1 mb-6 bg-sand-100/50 backdrop-blur-sm p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("review")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === "review"
              ? "bg-sand-50 text-sand-900 shadow-sm"
              : "text-sand-700 hover:text-sand-900"
          }`}
        >
          Review
        </button>
        <button
          onClick={() => setActiveTab("cloud")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === "cloud"
              ? "bg-sand-50 text-sand-900 shadow-sm"
              : "text-sand-700 hover:text-sand-900"
          }`}
        >
          Cloud
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === "timeline"
              ? "bg-sand-50 text-sand-900 shadow-sm"
              : "text-sand-700 hover:text-sand-900"
          }`}
        >
          Timeline
        </button>
      </div>

      {activeTab === "review" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-sand-700">Your Stats</h2>
          <div className="bg-sand-50/50 backdrop-blur-sm p-6 rounded-xl border border-sand-200">
            <h3 className="font-semibold mb-4 text-sand-700">Overview</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-sand-600">Total Songs:</span>
                <span className="text-lg">{results.numSongs}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sand-600">Hours Added:</span>
                <span className="text-lg">{results.hoursAdded}</span>
              </li>
              <li className="text-sm italic text-sand-600">
                {results.funStat}
              </li>
            </ul>
          </div>
        </div>
      )}
      {activeTab === "cloud" && <DataCloud tracks={tracks} />}
      {activeTab === "timeline" && <Timeline tracks={tracks} />}
    </div>
  );
}
