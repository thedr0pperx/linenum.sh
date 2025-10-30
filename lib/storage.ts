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
      
      console.log(`✅ Stored curl event from ${event.country} (${event.countryCode})`);
    } catch (error) {
      console.error('❌ Error storing in KV:', error);
      // Fall back to memory
      storeInMemory(event);
    }
  } else {
    console.log('ℹ️ KV not configured, using in-memory storage');
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
      return events.map((e: string) => JSON.parse(e));
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

function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'NL': 'Netherlands',
    'IN': 'India',
    'BR': 'Brazil',
    'JP': 'Japan',
    'CN': 'China',
    'RU': 'Russia',
    'ES': 'Spain',
    'IT': 'Italy',
    'MX': 'Mexico',
    'KR': 'South Korea',
    'ID': 'Indonesia',
    'TR': 'Turkey',
    'SA': 'Saudi Arabia',
    'PL': 'Poland',
    'Unknown': 'Unknown',
  };
  return countries[code] || code;
}

