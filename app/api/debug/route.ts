import { NextResponse } from 'next/server';
import { getCurledCountries, getLeaderboard } from '@/lib/storage';

export async function GET() {
  try {
    // Debug environment variables
    const hasKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
    const kvUrl = process.env.KV_REST_API_URL ? 'SET' : 'NOT SET';
    const kvToken = process.env.KV_REST_API_TOKEN ? 'SET' : 'NOT SET';
    
    // Get data
    const countries = await getCurledCountries();
    const leaderboard = await getLeaderboard(10);
    
    // Debug info
    const debug = {
      environment: process.env.NODE_ENV,
      kvConfigured: hasKV,
      kvUrl,
      kvToken,
      countriesCount: countries.length,
      countries,
      leaderboardCount: leaderboard.length,
      leaderboard,
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(debug, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ 
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
