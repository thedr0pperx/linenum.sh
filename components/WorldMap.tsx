'use client';

import { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

interface MapData {
  countries: string[]; // Array of country codes that have curled
}

// GeoJSON URL for world map
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function WorldMap() {
  const [mapData, setMapData] = useState<MapData>({ countries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const res = await fetch('/api/curls/map', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log('🗺️ Map data received:', data);
          setMapData(data);
        }
      } catch (error) {
        console.error('Failed to fetch map data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
    const interval = setInterval(fetchMapData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="cyber-card">
        <h3 className="text-xl sm:text-2xl font-bold text-matrix-green mb-3 sm:mb-4 font-mono glow-text">
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
      <h3 className="text-xl sm:text-2xl font-bold text-matrix-green mb-3 sm:mb-4 font-mono glow-text">
        🗺️ Global Dumbass Map
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
        <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-matrix-green rounded-sm mr-2"></span>
        Countries that have run LinEnum
        <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded-sm ml-4 mr-2"></span>
        Safe countries (so far)
      </p>

      <div className="relative bg-gray-50 border-2 border-matrix-green/30 rounded-lg p-2 sm:p-4 overflow-hidden">
        <div className="w-full" style={{ maxWidth: '100%', height: 'auto' }}>
          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
            width={800}
            height={400}
            style={{
              width: '100%',
              height: 'auto',
            }}
          >
            <ZoomableGroup center={[0, 0]} zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const iso2 = geo.properties.ISO_A2;
                    const iso3 = geo.properties.ISO_A3;
                    const isActive = mapData.countries.includes(iso2) ||
                                   mapData.countries.includes(iso3);

                    // Debug log for UK
                    if (iso2 === 'GB' || iso3 === 'GBR') {
                      console.log('🇬🇧 UK geo:', { iso2, iso3, isActive, countries: mapData.countries });
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isActive ? '#00FF41' : '#D1D5DB'}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            fill: isActive ? '#00FF41' : '#D1D5DB',
                            stroke: '#FFFFFF',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          hover: {
                            fill: isActive ? '#00CC33' : '#9CA3AF',
                            stroke: '#000000',
                            strokeWidth: 0.75,
                            outline: 'none',
                            cursor: 'pointer',
                          },
                          pressed: {
                            fill: isActive ? '#00AA22' : '#6B7280',
                            stroke: '#000000',
                            strokeWidth: 1,
                            outline: 'none',
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600 font-mono text-sm">
            🌍 <span className="font-bold text-matrix-green">{mapData.countries.length}</span> countries have run LinEnum
          </p>
        </div>
      </div>
    </div>
  );
}
