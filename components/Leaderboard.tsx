'use client';

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  country: string;
  countryCode: string;
  count: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/curls/leaderboard', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setLeaderboard(data.leaderboard || []);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="cyber-card">
        <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono">
          🏆 Dumbass by Country
        </h3>
        <div className="flex justify-center py-8">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  const getMedalEmoji = (rank: number) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `#${rank + 1}`;
  };

  return (
    <div className="cyber-card">
      <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono glow-text">
        🏆 Dumbass by Country
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Top 10 countries using LinEnum for security testing
      </p>

      <div className="space-y-2">
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-8 font-mono">
            No data yet...
          </p>
        ) : (
          leaderboard.map((entry, idx) => (
            <div
              key={entry.countryCode}
              className={`p-4 rounded-lg border-2 transition-all font-mono
                ${idx < 3 
                  ? 'bg-gradient-to-r from-yellow-50 to-white border-matrix-green/50' 
                  : 'bg-gray-50 border-matrix-green/20'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold min-w-[3rem]">
                    {getMedalEmoji(idx)}
                  </div>
                  <div className="text-3xl">
                    {getFlagEmoji(entry.countryCode)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {entry.country}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {entry.countryCode}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-matrix-green">
                    {entry.count}
                  </div>
                  <div className="text-gray-600 text-xs">
                    curls
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode === 'Unknown') return '🏴';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

