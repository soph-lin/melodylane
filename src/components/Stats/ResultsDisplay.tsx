import { SpotifyStats } from "@/types/stats";

interface ResultsDisplayProps {
  results: SpotifyStats | null;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) return null;

  return (
    <div className="mt-8">
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
          <li className="text-sm italic text-sand-600">{results.funStat}</li>
        </ul>
      </div>
    </div>
  );
}
