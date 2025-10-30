import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/storage';

export async function GET() {
  try {
    const leaderboard = await getLeaderboard(10);
    return NextResponse.json(
      { leaderboard },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ leaderboard: [] }, { status: 500 });
  }
}

// Use Node.js runtime for better KV support
export const runtime = 'nodejs';

