import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/storage';

export async function GET() {
  try {
    const leaderboard = await getLeaderboard(10);
    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ leaderboard: [] }, { status: 500 });
  }
}

// Enable CORS for client-side requests
export const runtime = 'edge';

