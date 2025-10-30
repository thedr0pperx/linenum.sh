import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;
  
  // Only intercept root path
  if (pathname === '/') {
    // Check if it's a curl/wget/httpie request
    const isCurl = userAgent.toLowerCase().includes('curl') || 
                   userAgent.toLowerCase().includes('wget') ||
                   userAgent.toLowerCase().includes('httpie');
    
    if (isCurl) {
      // Rewrite to the curl API endpoint
      return NextResponse.rewrite(new URL('/api/curl', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};

