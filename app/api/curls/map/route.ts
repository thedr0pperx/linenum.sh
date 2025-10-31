import { NextResponse } from 'next/server';
import { getCurledCountries } from '@/lib/storage';

export async function GET() {
  try {
    const countries = await getCurledCountries();
    return NextResponse.json(
      { countries },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching map data:', error);
    return NextResponse.json({ countries: [] }, { status: 500 });
  }
}

// Use Node.js runtime for better KV support
export const runtime = 'nodejs';

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

