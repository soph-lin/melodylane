export interface SpotifyStats {
  tracks: SpotifyTrack[];
  numSongs: number;
  hoursAdded: number;
  funStat: string;
}


export interface StatsFormData {
  timeType: string;
  seasonYear?: string;
  startDate?: string;
  endDate?: string;
  customDay?: string;
  dataType: 'sample' | 'spotify';
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyTrack {
  added_at: string;
  track: {
    id: string;
    name: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    album: {
      images: SpotifyImage[];
    };
    artists: {
      name: string;
    }[];
  };
}

export interface SampleData {
  tracks: SpotifyTrack[];
} 