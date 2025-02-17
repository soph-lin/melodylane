import { SpotifyTrack } from '@/types/stats';

export class SongAnalytics {
  constructor(
    private tracks: SpotifyTrack[],
    private startDate: Date,
    private endDate: Date
  ) {}

  analyze() {
    const filteredTracks = this.tracks
      .filter(track => {
        const addedDate = new Date(track.added_at.split('T')[0] + ' '); // Add space for UTC conversion
        return addedDate >= this.startDate && addedDate <= this.endDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.added_at.split('T')[0] + ' ');
        const dateB = new Date(b.added_at.split('T')[0] + ' ');
        return dateA.getTime() - dateB.getTime();
      });

    const totalTracks = filteredTracks.length;
    if (totalTracks === 0) return null;

    const hoursAdded = this.calculateTotalHours(filteredTracks);
    const funStat = this.generateFunStat(filteredTracks);

    return {
      tracks: filteredTracks,
      numSongs: totalTracks,
      hoursAdded,
      funStat
    };
  }

  private calculateTotalHours(tracks: SpotifyTrack[]): number {
    const totalMs = tracks.reduce((acc, song) => 
      acc + song.track.duration_ms, 0);
    return Number((totalMs / (1000 * 60 * 60)).toFixed(2));
  }

  private generateFunStat(tracks: SpotifyTrack[]): string {
    const totalHours = this.calculateTotalHours(tracks);
    if (totalHours > 10) return "That's a lot of music!";
    if (tracks.length > 50) return "Quite the collection!";
    return "What an interesting mix of songs!";
  }
} 