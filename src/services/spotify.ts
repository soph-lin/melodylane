interface SpotifyPlaylist {
  id: string;
  owner: { id: string };
  tracks: { href: string };
  items: SpotifyTrack[];
}

interface SpotifyTrack {
  added_at: string;
  track: {
    id: string;
    name: string;
    duration_ms: number;
    external_urls: { spotify: string };
    album: { images: { url: string }[] };
  };
}

interface SpotifyProfile {
  display_name: string;
  images: { url: string }[];
}

export async function spotifyRetrieve(token: string, url: string) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 429) {
    throw new Error('Rate limited');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
}

export async function getUserPlaylists(token: string) {
  let allPlaylists: SpotifyPlaylist[] = [];
  let offset = 0;
  
  while (true) {
    const data = await spotifyRetrieve(
      token,
      `https://api.spotify.com/v1/me/playlists/?offset=${offset}&limit=50`
    );
    
    allPlaylists = allPlaylists.concat(data.items);
    
    if (!data.next) break;
    offset += 50;
  }

  return allPlaylists;
}

export async function getUserProfile(token: string): Promise<SpotifyProfile> {
  const data = await spotifyRetrieve(
    token,
    'https://api.spotify.com/v1/me'
  );
  return data;
}