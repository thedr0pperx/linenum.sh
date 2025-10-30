// Storage utility for curl events
// Uses Vercel KV (Redis) for production, in-memory storage for development

import { kv } from '@vercel/kv';

interface CurlEvent {
  country: string;
  countryCode: string;
  timestamp: number;
  userAgent: string;
}

// In-memory storage for development (when KV is not available)
let memoryStore: CurlEvent[] = [];
let countryStats: Map<string, number> = new Map();

// Check if KV is configured by checking for environment variables
const isKVConfigured = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

export async function addCurlEvent(event: CurlEvent) {
  if (isKVConfigured()) {
    try {
      // Add to recent events list (keep last 100)
      await kv.lpush('curl_events', JSON.stringify(event));
      await kv.ltrim('curl_events', 0, 99);
      
      // Update country stats
      await kv.hincrby('country_stats', event.countryCode, 1);
      
      // Add country to set of countries that curled
      await kv.sadd('curled_countries', event.countryCode);
    } catch (error) {
      console.error('❌ Error storing in KV:', error);
      // Fall back to memory
      storeInMemory(event);
    }
  } else {
    storeInMemory(event);
  }
}

function storeInMemory(event: CurlEvent) {
  memoryStore.unshift(event);
  if (memoryStore.length > 100) {
    memoryStore = memoryStore.slice(0, 100);
  }
  
  const currentCount = countryStats.get(event.countryCode) || 0;
  countryStats.set(event.countryCode, currentCount + 1);
}

export async function getRecentEvents(limit: number = 10): Promise<CurlEvent[]> {
  if (isKVConfigured()) {
    try {
      const events = await kv.lrange('curl_events', 0, limit - 1);
      
      // Handle both string and object formats
      const processedEvents = events.map((e: any) => {
        let parsed;
        if (typeof e === 'string') {
          parsed = JSON.parse(e);
        } else {
          parsed = e; // Already an object
        }
        
        // Ensure country name is properly resolved from code if needed
        const countryCode = (parsed.countryCode || '').toUpperCase();
        let countryName = parsed.country;
        
        // If country is missing, unknown, or looks like a code, resolve it
        if (!countryName || countryName === 'Unknown' || countryName.length === 2 || countryName === countryCode) {
          countryName = getCountryName(countryCode);
        }
        
        // Extract only the fields we need, ignore ip field
        return {
          country: countryName,
          countryCode: countryCode || parsed.countryCode,
          timestamp: parsed.timestamp,
          userAgent: parsed.userAgent
        } as CurlEvent;
      });
      return processedEvents;
    } catch (error) {
      console.error('Error reading from KV:', error);
      return memoryStore.slice(0, limit);
    }
  } else {
    return memoryStore.slice(0, limit);
  }
}

export async function getLeaderboard(limit: number = 10): Promise<Array<{country: string, countryCode: string, count: number}>> {
  if (isKVConfigured()) {
    try {
      const stats = await kv.hgetall('country_stats');
      const entries = Object.entries(stats || {})
        .map(([code, count]) => ({
          countryCode: code,
          country: getCountryName(code),
          count: Number(count),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
      return entries;
    } catch (error) {
      console.error('Error reading leaderboard from KV:', error);
      return getLeaderboardFromMemory(limit);
    }
  } else {
    return getLeaderboardFromMemory(limit);
  }
}

function getLeaderboardFromMemory(limit: number) {
  return Array.from(countryStats.entries())
    .map(([code, count]) => ({
      countryCode: code,
      country: getCountryName(code),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getCurledCountries(): Promise<string[]> {
  if (isKVConfigured()) {
    try {
      const countries = await kv.smembers('curled_countries');
      return countries || [];
    } catch (error) {
      console.error('Error reading countries from KV:', error);
      return Array.from(countryStats.keys());
    }
  } else {
    return Array.from(countryStats.keys());
  }
}

// Comprehensive country code to name mapping (matches geolocation.ts)
const COUNTRY_NAMES: Record<string, string> = {
  'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia',
  'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
  'BE': 'Belgium', 'CH': 'Switzerland', 'AT': 'Austria', 'SE': 'Sweden', 'NO': 'Norway',
  'DK': 'Denmark', 'FI': 'Finland', 'PL': 'Poland', 'IE': 'Ireland', 'PT': 'Portugal',
  'GR': 'Greece', 'CZ': 'Czech Republic', 'HU': 'Hungary', 'RO': 'Romania', 'BG': 'Bulgaria',
  'HR': 'Croatia', 'SK': 'Slovakia', 'SI': 'Slovenia', 'LT': 'Lithuania', 'LV': 'Latvia',
  'EE': 'Estonia', 'LU': 'Luxembourg', 'MT': 'Malta', 'CY': 'Cyprus', 'IS': 'Iceland',
  'IN': 'India', 'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'SG': 'Singapore',
  'MY': 'Malaysia', 'TH': 'Thailand', 'ID': 'Indonesia', 'PH': 'Philippines', 'VN': 'Vietnam',
  'TW': 'Taiwan', 'HK': 'Hong Kong', 'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia',
  'IL': 'Israel', 'TR': 'Turkey', 'EG': 'Egypt', 'ZA': 'South Africa', 'NG': 'Nigeria',
  'KE': 'Kenya', 'MA': 'Morocco', 'BR': 'Brazil', 'MX': 'Mexico', 'AR': 'Argentina',
  'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru', 'VE': 'Venezuela', 'EC': 'Ecuador',
  'NZ': 'New Zealand', 'FJ': 'Fiji', 'PG': 'Papua New Guinea', 'RU': 'Russia',
  'UA': 'Ukraine', 'BY': 'Belarus', 'KZ': 'Kazakhstan', 'UZ': 'Uzbekistan', 'PK': 'Pakistan',
  'BD': 'Bangladesh', 'LK': 'Sri Lanka', 'NP': 'Nepal', 'MM': 'Myanmar', 'KH': 'Cambodia',
  'LA': 'Laos', 'MN': 'Mongolia', 'AF': 'Afghanistan', 'IQ': 'Iraq', 'IR': 'Iran',
  'JO': 'Jordan', 'LB': 'Lebanon', 'SY': 'Syria', 'YE': 'Yemen', 'OM': 'Oman',
  'KW': 'Kuwait', 'QA': 'Qatar', 'BH': 'Bahrain', 'DZ': 'Algeria', 'TN': 'Tunisia',
  'LY': 'Libya', 'SD': 'Sudan', 'ET': 'Ethiopia', 'GH': 'Ghana', 'TZ': 'Tanzania',
  'UG': 'Uganda', 'RW': 'Rwanda', 'ZM': 'Zambia', 'ZW': 'Zimbabwe', 'BW': 'Botswana',
  'MU': 'Mauritius', 'MZ': 'Mozambique', 'AO': 'Angola', 'SN': 'Senegal', 'CI': 'Ivory Coast',
  'CM': 'Cameroon', 'MG': 'Madagascar', 'CV': 'Cape Verde', 'BJ': 'Benin', 'ML': 'Mali',
  'BF': 'Burkina Faso', 'NE': 'Niger', 'TD': 'Chad', 'MR': 'Mauritania', 'GN': 'Guinea',
  'SL': 'Sierra Leone', 'LR': 'Liberia', 'TG': 'Togo', 'GA': 'Gabon', 'CG': 'Congo',
  'CD': 'DR Congo', 'CF': 'Central African Republic', 'SO': 'Somalia', 'DJ': 'Djibouti',
  'ER': 'Eritrea', 'SS': 'South Sudan', 'UY': 'Uruguay', 'PY': 'Paraguay', 'BO': 'Bolivia',
  'GY': 'Guyana', 'SR': 'Suriname', 'GF': 'French Guiana', 'FK': 'Falkland Islands',
  'CR': 'Costa Rica', 'PA': 'Panama', 'NI': 'Nicaragua', 'HN': 'Honduras', 'GT': 'Guatemala',
  'BZ': 'Belize', 'SV': 'El Salvador', 'CU': 'Cuba', 'JM': 'Jamaica', 'HT': 'Haiti',
  'DO': 'Dominican Republic', 'PR': 'Puerto Rico', 'TT': 'Trinidad and Tobago', 'BB': 'Barbados',
  'BS': 'Bahamas', 'AG': 'Antigua and Barbuda', 'DM': 'Dominica', 'LC': 'Saint Lucia',
  'VC': 'Saint Vincent', 'GD': 'Grenada', 'KN': 'Saint Kitts', 'TC': 'Turks and Caicos',
  'VG': 'British Virgin Islands', 'VI': 'US Virgin Islands', 'AW': 'Aruba', 'CW': 'Curaçao',
  'SX': 'Sint Maarten', 'AI': 'Anguilla', 'MS': 'Montserrat', 'BM': 'Bermuda',
  'GL': 'Greenland', 'PM': 'Saint Pierre', 'NC': 'New Caledonia', 'PF': 'French Polynesia',
  'WS': 'Samoa', 'TO': 'Tonga', 'VU': 'Vanuatu', 'SB': 'Solomon Islands', 'KI': 'Kiribati',
  'TV': 'Tuvalu', 'NR': 'Nauru', 'PW': 'Palau', 'FM': 'Micronesia', 'MH': 'Marshall Islands',
  'AS': 'American Samoa', 'GU': 'Guam', 'MP': 'Northern Mariana', 'CK': 'Cook Islands',
  'NU': 'Niue', 'TK': 'Tokelau', 'WF': 'Wallis and Futuna', 'LO': 'Localhost',
};

function getCountryName(code: string): string {
  if (!code || code === 'Unknown') return 'Unknown';
  const upperCode = code.toUpperCase();
  return COUNTRY_NAMES[upperCode] || upperCode;
}

