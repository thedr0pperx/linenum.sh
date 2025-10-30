'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface CurlEvent {
  country: string;
  countryCode: string;
  timestamp: number;
  userAgent: string;
}

export default function LiveCurlFeed() {
  const [events, setEvents] = useState<CurlEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Add timestamp to force fresh data
        const res = await fetch(`/api/curls/recent?t=${Date.now()}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log('📍 Recent events received:', data);
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="cyber-card">
        <h3 className="text-xl sm:text-2xl font-bold text-matrix-green mb-3 sm:mb-4 font-mono glow-text">
          🌍 Last 10 Countries
        </h3>
        <div className="flex justify-center py-8">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-card">
      <h3 className="text-xl sm:text-2xl font-bold text-matrix-green mb-3 sm:mb-4 font-mono glow-text">
        🌍 Last 10 Countries
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
        Latest countries to run LinEnum installation
      </p>

      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-8 font-mono text-sm">
            Waiting for installations...
          </p>
        ) : (
          events.map((event, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 bg-gray-50 border border-matrix-green/20 rounded-lg
                       hover:border-matrix-green/40 transition-all font-mono text-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{getFlagEmoji(event.countryCode)}</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">
                      {event.country || 'Unknown'}
                    </div>
                  </div>
                </div>
                <div className="text-gray-500 text-xs text-right">
                  {formatDistanceToNow(event.timestamp, { addSuffix: true })}
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

