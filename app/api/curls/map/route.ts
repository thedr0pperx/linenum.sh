import { NextResponse } from 'next/server';
import { getCurledCountries } from '@/lib/storage';

export async function GET() {
  try {
    const countries = await getCurledCountries();
    return NextResponse.json({ countries });
  } catch (error) {
    console.error('Error fetching map data:', error);
    return NextResponse.json({ countries: [] }, { status: 500 });
  }
}

// Enable CORS for client-side requests
export const runtime = 'edge';

