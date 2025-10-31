import { NextResponse } from 'next/server';
import { getRecentEvents } from '@/lib/storage';

export async function GET() {
  try {
    const events = await getRecentEvents(10);
    
    return NextResponse.json(
      { events },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error fetching recent events:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json({ 
      events: [], 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

// Use Node.js runtime for better KV support
export const runtime = 'nodejs';

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

