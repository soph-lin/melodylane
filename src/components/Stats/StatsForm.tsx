"use client";

import { useState, useEffect } from "react";
import { SpotifyStats, SpotifyTrack, SampleData } from "@/types/stats";
import { getDates, getSeasonDates } from "@/utils/dates";
import { createSpotifyAuthURL } from "@/utils/spotify-auth";
import { spotifyRetrieve, getUserPlaylists } from "@/services/spotify";
import { SongAnalytics } from "@/services/analytics";
import sampleData from "@/data/sample-data.json";
import SongDisplay from "./SongDisplay";
import LoadingScreen from "@/components/UI/LoadingScreen";
import CustomSelect from "@/components/UI/CustomSelect";
import Autocomplete from "@/components/UI/Autocomplete";
import Alert from "@/components/UI/Alert";

export default function StatsForm() {
  const [timeType, setTimeType] = useState(() => {
    // Initialize with localStorage value or default
    return localStorage.getItem("melodylane-time-type") || "spring";
  });

  const [seasonYear, setSeasonYear] = useState(() => {
    // Initialize with localStorage value or empty string
    return localStorage.getItem("melodylane-season-year") || "";
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customDay, setCustomDay] = useState("");
  const [dataType, setDataType] = useState("use sample data");
  const [clientId, setClientId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SpotifyStats | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    const savedStartDate = localStorage.getItem("melodylane-start-date");
    if (savedStartDate) setStartDate(savedStartDate);
    const savedEndDate = localStorage.getItem("melodylane-end-date");
    if (savedEndDate) setEndDate(savedEndDate);
    const savedDay = localStorage.getItem("melodylane-day");
    if (savedDay) setCustomDay(savedDay);
    const savedClientId = localStorage.getItem("melodylane-client-id");
    if (savedClientId) setClientId(savedClientId);

    // Check authentication
    const token = localStorage.getItem("melodylane-spotify-token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    localStorage.setItem("melodylane-time-type", timeType);
  }, [timeType]);

  useEffect(() => {
    localStorage.setItem("melodylane-season-year", seasonYear);
  }, [seasonYear]);

  useEffect(() => {
    if (startDate) {
      localStorage.setItem("melodylane-start-date", startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      localStorage.setItem("melodylane-end-date", endDate);
    }
  }, [endDate]);

  useEffect(() => {
    if (customDay) {
      localStorage.setItem("melodylane-day", customDay);
    }
  }, [customDay]);

  const handleResults = (results: SpotifyStats | null) => {
    setTracks(results?.tracks || []);
    setResults(results);
  };

  const processSpotifyData = async (dates: {
    startingDate: Date;
    endingDate: Date;
  }) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("melodylane-spotify-token");
      if (!token) throw new Error("No token found");

      // Get user data and playlists
      const userData = await spotifyRetrieve(
        token,
        "https://api.spotify.com/v1/me"
      );
      const allPlaylists = await getUserPlaylists(token);
      const userPlaylists = allPlaylists.filter(
        (playlist) => playlist.owner.id === userData.id
      );

      // Get tracks from playlists
      const tracks: SpotifyTrack[] = [];
      for (const playlist of userPlaylists) {
        const playlistTracks = await spotifyRetrieve(
          token,
          playlist.tracks.href
        );
        const filteredTracks = playlistTracks.items.filter(
          (track: SpotifyTrack) => {
            const addedAt = new Date(track.added_at);
            return addedAt >= dates.startingDate && addedAt <= dates.endingDate;
          }
        );
        tracks.push(...filteredTracks);
      }

      // Analyze data
      const analytics = new SongAnalytics(
        tracks,
        dates.startingDate,
        dates.endingDate
      );
      const results = analytics.analyze();
      handleResults(results);
    } catch (error) {
      console.error("Error processing Spotify data:", error);
      showAlert("Error processing Spotify data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (dataType === "use my spotify" && !isAuthenticated) {
      if (!clientId) {
        showAlert("Please enter your Spotify Client ID");
        return;
      }
      localStorage.setItem("melodylane-client-id", clientId);
      window.location.href = createSpotifyAuthURL(clientId);
      return;
    }

    let dates: { startingDate: Date; endingDate: Date };

    if (["spring", "summer", "fall", "winter"].includes(timeType)) {
      if (!seasonYear) {
        showAlert("Input a year!");
        return;
      }
      dates = getSeasonDates(timeType, seasonYear);
    } else if (timeType === "custom period") {
      if (!startDate || !endDate) {
        showAlert("Input both start and end dates!");
        return;
      }
      if (startDate === endDate) {
        showAlert(
          "Start and end date can't be the same! Try custom day instead..."
        );
        return;
      }
      dates = {
        startingDate: new Date(`${startDate} `),
        endingDate: new Date(`${endDate} `),
      };
      if (dates.endingDate < dates.startingDate) {
        showAlert("End date can't be before start date!");
        return;
      }
    } else if (timeType === "custom day") {
      if (!customDay) {
        showAlert("Input a day!");
        return;
      }
      const day = new Date(`${customDay} `);
      dates = { startingDate: day, endingDate: day };
    } else {
      dates = getDates(timeType);
    }

    // Process data and return results
    if (dataType === "use sample data") {
      setIsLoading(true);
      try {
        const analytics = new SongAnalytics(
          (sampleData as SampleData).tracks,
          dates.startingDate,
          dates.endingDate
        );
        const results = analytics.analyze();
        handleResults(results);
      } finally {
        setIsLoading(false);
      }
    } else {
      await processSpotifyData(dates);
    }
  };

  // Update the handlers to immediately save to localStorage
  const handleTimeTypeChange = (value: string) => {
    setTimeType(value);
    localStorage.setItem("melodylane-time-type", value);
  };

  const handleSeasonYearChange = (value: string) => {
    setSeasonYear(value);
    localStorage.setItem("melodylane-season-year", value);
  };

  const showAlert = (message: string) => {
    setAlert(message);
  };

  const handleClientIdFocus = () => {
    if (!clientId) {
      showAlert(
        "Click on the wrench icon to learn how to set up your client ID!"
      );
    }
  };

  return (
    <div className="bg-card backdrop-blur-sm p-4 md:p-6 rounded-xl card-glow border border-sand-200">
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-full">
            <Autocomplete
              timeType={timeType}
              seasonYear={seasonYear}
              startDate={startDate}
              endDate={endDate}
              customDay={customDay}
              onTimeTypeChange={handleTimeTypeChange}
              onSeasonYearChange={handleSeasonYearChange}
              onDateRangeChange={(start, end) => {
                if (start) setStartDate(start);
                if (end) setEndDate(end);
              }}
              onCustomDayChange={(value) => setCustomDay(value)}
              options={[
                "spring",
                "summer",
                "fall",
                "winter",
                "today",
                "yesterday",
                "last week",
                "last month",
                "custom period",
                "custom day",
              ]}
            />
          </div>
        </div>

        {/* Data Source Row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-full md:w-auto md:flex-grow">
            <CustomSelect
              value={dataType}
              onChange={(value) => setDataType(value)}
              options={["use sample data", "use my spotify"]}
            />
          </div>

          {dataType === "use my spotify" && !isAuthenticated && (
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              onFocus={handleClientIdFocus}
              placeholder="Your Spotify Client ID"
              className="w-full md:w-auto flex-grow bg-sand-50/50 border border-sand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sand-300 focus:outline-none transition-all"
            />
          )}

          <button
            onClick={handleSubmit}
            className="w-full md:w-auto bg-sand-500 hover:bg-sand-600 text-sand-50 px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-sand-500/20"
          >
            GO
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingScreen message="Retrieving your songs..." />
      ) : results ? (
        <SongDisplay tracks={tracks} results={results} />
      ) : (
        <div className="mt-5 ml-2">Wow, such empty.</div>
      )}

      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}
    </div>
  );
}
