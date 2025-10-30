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
      console.log('📊 Raw events from KV:', events.length, typeof events[0]);
      
      // Handle both string and object formats
      const processedEvents = events.map((e: any) => {
        let parsed;
        if (typeof e === 'string') {
          parsed = JSON.parse(e);
        } else {
          parsed = e; // Already an object
        }
        
        // Extract only the fields we need, ignore ip field
        return {
          country: parsed.country,
          countryCode: parsed.countryCode,
          timestamp: parsed.timestamp,
          userAgent: parsed.userAgent
        } as CurlEvent;
      });
      console.log('📊 Processed events:', processedEvents.length);
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
      console.log('📊 getLeaderboard KV stats:', stats);
      const entries = Object.entries(stats || {})
        .map(([code, count]) => ({
          countryCode: code,
          country: getCountryName(code),
          count: Number(count),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
      console.log('📊 getLeaderboard result:', entries);
      return entries;
    } catch (error) {
      console.error('Error reading leaderboard from KV:', error);
      return getLeaderboardFromMemory(limit);
    }
  } else {
    const result = getLeaderboardFromMemory(limit);
    console.log('📊 getLeaderboard from memory:', result);
    return result;
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
      console.log('📍 getCurledCountries from KV:', countries);
      return countries || [];
    } catch (error) {
      console.error('Error reading countries from KV:', error);
      const fallback = Array.from(countryStats.keys());
      console.log('📍 getCurledCountries fallback:', fallback);
      return fallback;
    }
  } else {
    const memory = Array.from(countryStats.keys());
    console.log('📍 getCurledCountries from memory:', memory);
    return memory;
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

