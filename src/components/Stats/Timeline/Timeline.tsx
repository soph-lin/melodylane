import { SpotifyTrack } from "@/types/stats";
import { useState } from "react";
import Image from "next/image";

interface TimelineProps {
  tracks: SpotifyTrack[];
}

export default function Timeline({ tracks }: TimelineProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  // Group tracks by month/year
  const groupedTracks = tracks.reduce((groups, track) => {
    const date = new Date(track.added_at.split("T")[0] + " ");
    const key = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(track);
    return groups;
  }, {} as Record<string, SpotifyTrack[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.split("T")[0] + " ");
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleGroup = (monthYear: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [monthYear]: !prev[monthYear],
    }));
  };

  return (
    <div className="max-w-2xl">
      {Object.entries(groupedTracks).map(([monthYear, monthTracks]) => (
        <div key={monthYear} className="mb-8">
          <button
            onClick={() => toggleGroup(monthYear)}
            className="flex items-center gap-2 text-lg font-semibold text-sand-700 mb-4 hover:text-sand-800"
          >
            <span
              className="w-4 transition-transform duration-200"
              style={{
                transform: expandedGroups[monthYear]
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            >
              ▶
            </span>
            {monthYear} ({monthTracks.length} tracks)
          </button>
          <div
            className={`border-l-2 border-sand-200 pl-8 space-y-4 overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
              maxHeight: expandedGroups[monthYear]
                ? `${monthTracks.length * 100}px`
                : "0",
              opacity: expandedGroups[monthYear] ? 1 : 0,
            }}
          >
            {monthTracks.map((track, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[25px] top-2 w-4 h-4 bg-sand-100 border-2 border-sand-300 rounded-full" />
                <a
                  href={track.track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-sand-50/50 backdrop-blur-sm hover:bg-sand-100/50 rounded-lg border border-sand-200 transition-all duration-200 hover:-translate-y-1"
                >
                  <Image
                    src={track.track.album.images[0]?.url}
                    alt={track.track.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="font-medium text-sand-700">
                      {track.track.name}
                    </div>
                    <div className="text-sm text-sand-600">
                      {formatDate(track.added_at)}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
