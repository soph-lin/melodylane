const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPE = "user-read-private playlist-read-private playlist-read-collaborative user-read-email user-library-read";

export function createSpotifyAuthURL(clientId: string) {
  const redirectUri = typeof window !== 'undefined' ? 
    `${window.location.origin}/callback` : '';

  return `${SPOTIFY_AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${SCOPE}&response_type=token`;
}

export function getAccessTokenFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  
  const hash = window.location.hash;
  if (!hash) return null;

  return hash
    .substring(1)
    .split("&")
    .find(elem => elem.startsWith("access_token"))
    ?.split("=")[1] || null;
} 