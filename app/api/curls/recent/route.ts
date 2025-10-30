import { NextResponse } from 'next/server';
import { getRecentEvents } from '@/lib/storage';

export async function GET() {
  try {
    const events = await getRecentEvents(10);
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching recent events:', error);
    return NextResponse.json({ events: [] }, { status: 500 });
  }
}

// Enable CORS for client-side requests
export const runtime = 'edge';

