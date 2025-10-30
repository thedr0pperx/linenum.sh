import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const hostname = request.nextUrl.hostname;
  
  // Check if it's a curl/wget/httpie request
  const isCurl = userAgent.toLowerCase().includes('curl') || 
                 userAgent.toLowerCase().includes('wget') ||
                 userAgent.toLowerCase().includes('httpie');
  
  // If it's curl and accessing non-www domain, redirect to www with 301 (permanent)
  // Curl will follow this redirect automatically in most cases
  if (isCurl && !hostname.startsWith('www.')) {
    const url = new URL(request.url);
    url.hostname = `www.${hostname}`;
    return NextResponse.redirect(url, { status: 301 });
  }
  
  // Handle curl requests on www domain
  if (isCurl && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/api/curl', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};

