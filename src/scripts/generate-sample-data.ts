import { songData, audioData } from '@/reference/spotistats/spotistats-sample-data.js';
import fs from 'fs';
import path from 'path';

const sampleData = {
  tracks: songData,
  audioFeatures: audioData.filter((feature): feature is NonNullable<typeof feature> => 
    feature !== null
  ).map(feature => ({
    danceability: feature.danceability || 0,
    energy: feature.energy || 0,
    instrumentalness: feature.instrumentalness || 0,
    loudness: feature.loudness || 0,
    speechiness: feature.speechiness || 0,
    tempo: feature.tempo || 0,
    valence: feature.valence || 0,
    key: feature.key || 0,
    timeSignature: feature.time_signature || 4
  }))
};

const dataDir = path.join(process.cwd(), 'src', 'data');
const outputPath = path.join(dataDir, 'sample-data.json');

// Create directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(sampleData, null, 2));
console.log('Sample data generated successfully!'); 