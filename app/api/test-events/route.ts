import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    // Check if KV is configured
    const hasKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
    
    if (!hasKV) {
      return NextResponse.json({ 
        error: 'KV not configured',
        hasKV: false 
      });
    }
    
    // Get raw events
    const rawEvents = await kv.lrange('curl_events', 0, 9);
    
    // Parse and show structure
    const parsedEvents = rawEvents.map((e: string, index: number) => {
      try {
        const parsed = JSON.parse(e);
        return {
          index,
          hasIp: 'ip' in parsed,
          fields: Object.keys(parsed),
          data: parsed
        };
      } catch (err) {
        return { index, error: 'Failed to parse', raw: e };
      }
    });
    
    return NextResponse.json({
      hasKV,
      totalEvents: rawEvents.length,
      events: parsedEvents
    });
  } catch (error) {
    return NextResponse.json({ 
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}

export const runtime = 'nodejs';
