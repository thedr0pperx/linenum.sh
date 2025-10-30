'use client';

import { useEffect, useState } from 'react';

interface MapData {
  countries: string[]; // Array of country codes that have curled
}

export default function WorldMap() {
  const [mapData, setMapData] = useState<MapData>({ countries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const res = await fetch('/api/curls/map');
        if (res.ok) {
          const data = await res.json();
          setMapData(data);
        }
      } catch (error) {
        console.error('Failed to fetch map data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
    const interval = setInterval(fetchMapData, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="cyber-card">
        <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono">
          🗺️ Global Dumbass Map
        </h3>
        <div className="flex justify-center py-8">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-card">
      <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono glow-text">
        🗺️ Global Dumbass Map
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        <span className="inline-block w-4 h-4 bg-matrix-green rounded-sm mr-2"></span>
        Countries actively using LinEnum
      </p>

      <div className="relative bg-gray-50 border-2 border-matrix-green/30 rounded-lg p-8 min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 mb-4 font-mono">
            🌍 {mapData.countries.length} countries using LinEnum
          </p>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-6">
            {mapData.countries.map((code) => (
              <div
                key={code}
                className="text-4xl p-2 bg-green-50 rounded border-2 border-matrix-green/30
                         hover:scale-110 transition-transform hover:border-matrix-green"
                title={code}
              >
                {getFlagEmoji(code)}
              </div>
            ))}
          </div>

          {mapData.countries.length === 0 && (
            <p className="text-gray-500 py-12 font-mono">
              No installations yet...
            </p>
          )}

          <div className="mt-8 text-sm text-gray-500 font-mono">
            <p>💡 A proper world map visualization requires additional libraries.</p>
            <p>For now, enjoy this flag grid of shame! 🚩</p>
          </div>
        </div>
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

