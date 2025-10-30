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
                    
                    // Comprehensive mapping of country codes to possible names in GeoJSON
                    const getCountryNamesForCode = (code: string): string[] => {
                      const mapping: Record<string, string[]> = {
                        'US': ['United States', 'USA', 'United States of America'],
                        'GB': ['United Kingdom', 'UK', 'Britain', 'Great Britain'],
                        'CA': ['Canada'], 'AU': ['Australia'], 'DE': ['Germany'], 'FR': ['France'],
                        'IT': ['Italy'], 'ES': ['Spain'], 'NL': ['Netherlands'], 'BE': ['Belgium'],
                        'CH': ['Switzerland'], 'AT': ['Austria'], 'SE': ['Sweden'], 'NO': ['Norway'],
                        'DK': ['Denmark'], 'FI': ['Finland'], 'PL': ['Poland'], 'IE': ['Ireland'],
                        'PT': ['Portugal'], 'GR': ['Greece'], 'CZ': ['Czech Republic', 'Czechia'],
                        'HU': ['Hungary'], 'RO': ['Romania'], 'BG': ['Bulgaria'], 'HR': ['Croatia'],
                        'SK': ['Slovakia'], 'SI': ['Slovenia'], 'LT': ['Lithuania'], 'LV': ['Latvia'],
                        'EE': ['Estonia'], 'LU': ['Luxembourg'], 'MT': ['Malta'], 'CY': ['Cyprus'],
                        'IS': ['Iceland'], 'IN': ['India'], 'CN': ['China'], 'JP': ['Japan'],
                        'KR': ['South Korea', 'Korea'], 'SG': ['Singapore'], 'MY': ['Malaysia'],
                        'TH': ['Thailand'], 'ID': ['Indonesia'], 'PH': ['Philippines'], 'VN': ['Vietnam', 'Viet Nam'],
                        'TW': ['Taiwan'], 'HK': ['Hong Kong'], 'AE': ['United Arab Emirates', 'UAE'],
                        'SA': ['Saudi Arabia'], 'IL': ['Israel'], 'TR': ['Turkey'], 'EG': ['Egypt'],
                        'ZA': ['South Africa'], 'NG': ['Nigeria'], 'KE': ['Kenya'], 'MA': ['Morocco'],
                        'BR': ['Brazil'], 'MX': ['Mexico'], 'AR': ['Argentina'], 'CL': ['Chile'],
                        'CO': ['Colombia'], 'PE': ['Peru'], 'VE': ['Venezuela'], 'EC': ['Ecuador'],
                        'NZ': ['New Zealand'], 'RU': ['Russia', 'Russian Federation'], 'UA': ['Ukraine'],
                        'BY': ['Belarus'], 'KZ': ['Kazakhstan'], 'UZ': ['Uzbekistan'], 'PK': ['Pakistan'],
                        'BD': ['Bangladesh'], 'LK': ['Sri Lanka'], 'NP': ['Nepal'], 'MM': ['Myanmar', 'Burma'],
                        'KH': ['Cambodia'], 'LA': ['Laos'], 'MN': ['Mongolia'], 'AF': ['Afghanistan'],
                        'IQ': ['Iraq'], 'IR': ['Iran'], 'JO': ['Jordan'], 'LB': ['Lebanon'],
                        'SY': ['Syria'], 'YE': ['Yemen'], 'OM': ['Oman'], 'KW': ['Kuwait'],
                        'QA': ['Qatar'], 'BH': ['Bahrain'], 'DZ': ['Algeria'], 'TN': ['Tunisia'],
                        'LY': ['Libya'], 'SD': ['Sudan'], 'ET': ['Ethiopia'], 'GH': ['Ghana'],
                        'TZ': ['Tanzania'], 'UG': ['Uganda'], 'RW': ['Rwanda'], 'ZM': ['Zambia'],
                        'ZW': ['Zimbabwe'], 'BW': ['Botswana'], 'MU': ['Mauritius'], 'MZ': ['Mozambique'],
                        'AO': ['Angola'], 'SN': ['Senegal'], 'CI': ['Ivory Coast', 'Côte d\'Ivoire'],
                        'CM': ['Cameroon'], 'MG': ['Madagascar'], 'CV': ['Cape Verde'], 'BJ': ['Benin'],
                        'ML': ['Mali'], 'BF': ['Burkina Faso'], 'NE': ['Niger'], 'TD': ['Chad'],
                        'MR': ['Mauritania'], 'GN': ['Guinea'], 'SL': ['Sierra Leone'], 'LR': ['Liberia'],
                        'TG': ['Togo'], 'GA': ['Gabon'], 'CG': ['Congo'], 'CD': ['DR Congo', 'Democratic Republic of the Congo'],
                        'CF': ['Central African Republic'], 'SO': ['Somalia'], 'DJ': ['Djibouti'],
                        'ER': ['Eritrea'], 'SS': ['South Sudan'], 'UY': ['Uruguay'], 'PY': ['Paraguay'],
                        'BO': ['Bolivia'], 'GY': ['Guyana'], 'SR': ['Suriname'], 'CR': ['Costa Rica'],
                        'PA': ['Panama'], 'NI': ['Nicaragua'], 'HN': ['Honduras'], 'GT': ['Guatemala'],
                        'BZ': ['Belize'], 'SV': ['El Salvador'], 'CU': ['Cuba'], 'JM': ['Jamaica'],
                        'HT': ['Haiti'], 'DO': ['Dominican Republic'], 'PR': ['Puerto Rico'],
                        'TT': ['Trinidad and Tobago'], 'BB': ['Barbados'], 'BS': ['Bahamas'],
                        'FJ': ['Fiji'], 'PG': ['Papua New Guinea'],
                      };
                      return mapping[code.toUpperCase()] || [];
                    };
                    
                    // Check if country is active
                    const isActive = mapData.countries.some(code => {
                      if (!code || code === 'Unknown' || code === 'LO') return false;
                      const upperCode = code.toUpperCase();
                      
                      // Get possible names for this code
                      const possibleNames = getCountryNamesForCode(upperCode);
                      
                      // If no mapping exists, try direct code match (some GeoJSON might have ISO codes)
                      if (possibleNames.length === 0) {
                        // Check if GeoJSON has ISO_A2 or similar property
                        const isoCode = props.ISO_A2 || props.ISO_A3 || props.ISO || '';
                        if (isoCode && isoCode.toUpperCase() === upperCode) {
                          return true;
                        }
                        return false;
                      }
                      
                      // Check if the geography name matches any possible name
                      const matches = possibleNames.some(possibleName => 
                        countryName.toLowerCase() === possibleName.toLowerCase()
                      );
                      
                      return matches;
                    });

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
