import fs from 'fs';
import path from 'path';

const main = async () => {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Please provide a path to the input file');
    process.exit(1);
  }
  const { default: songData } = await import(path.resolve(inputPath));

  const sampleData = {
    tracks: songData,
  };

  const dataDir = path.join(process.cwd(), 'src', 'data');
  const outputPath = path.join(dataDir, 'sample-data.json');

  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(sampleData, null, 2));
  console.log('Sample data generated successfully!');
};

main().catch(console.error); 