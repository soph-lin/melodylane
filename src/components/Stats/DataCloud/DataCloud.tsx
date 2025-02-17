"use client";

import { useState, useEffect } from "react";
import Particle from "./Particle";
import { SpotifyTrack } from "@/types/stats";

interface DataCloudProps {
  tracks: SpotifyTrack[];
  containerWidth?: number;
  containerHeight?: number;
}

export default function DataCloud({
  tracks,
  containerWidth = 400,
  containerHeight = 400,
}: DataCloudProps) {
  const [particles, setParticles] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    // Select random tracks for the cloud (max 40 tracks)
    const selectedTracks = tracks
      .filter(
        (track) =>
          track.track.album.images?.[0]?.url &&
          track.track.external_urls?.spotify
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 40);

    setParticles(selectedTracks);
  }, [tracks]);

  return (
    <div className="flex justify-center">
      <div
        className="relative"
        style={{
          width: containerWidth,
          height: containerHeight,
          perspective: "1000px",
        }}
      >
        {particles.map((track, index) => (
          <Particle
            key={`${track.track.id}-${index}`}
            imgSrc={track.track.album.images[0].url}
            link={track.track.external_urls.spotify}
            name={track.track.name}
            track={track}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
          />
        ))}
      </div>
    </div>
  );
}
