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
        // Add timestamp to force fresh data
        const res = await fetch(`/api/curls/map?t=${Date.now()}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
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
        No usage yet
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
                    // Get the country name from properties
                    const props = geo.properties || {};
                    const countryName = props.name || '';
                    
                    // Log first few countries to see the naming format
                    if (geo.rsmKey === 'geo-1' || geo.rsmKey === 'geo-2' || geo.rsmKey === 'geo-3') {
                      console.log(`📍 Geography ${geo.rsmKey}:`, countryName);
                    }
                    
                    // Map of country codes to names
                    const countryCodeToName: Record<string, string[]> = {
                      'GB': ['United Kingdom', 'UK', 'Britain', 'Great Britain'],
                      'US': ['United States', 'USA', 'United States of America'],
                      'DE': ['Germany'],
                      'FR': ['France'],
                      'CA': ['Canada'],
                      'AU': ['Australia'],
                    };
                    
                    // Check if country is active
                    const isActive = mapData.countries.some(code => {
                      if (!code) return false;
                      const upperCode = code.toUpperCase();
                      
                      // Get possible names for this code
                      const possibleNames = countryCodeToName[upperCode] || [];
                      
                      // Check if the geography name matches any possible name
                      const matches = possibleNames.some(possibleName => 
                        countryName.toLowerCase() === possibleName.toLowerCase()
                      );
                      
                      if (matches) {
                        console.log(`✅ Matched: ${countryName} = ${code}`);
                      }
                      
                      return matches;
                    });
                    
                    // Debug UK specifically
                    if (countryName.toLowerCase().includes('united kingdom') || 
                        countryName.toLowerCase().includes('britain')) {
                      console.log('🇬🇧 UK found:', {
                        countryName,
                        isActive,
                        searching: mapData.countries,
                      });
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
