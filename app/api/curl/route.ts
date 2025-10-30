import { NextRequest, NextResponse } from 'next/server';
import { getLocationFromIP } from '@/lib/geolocation';
import { addCurlEvent } from '@/lib/storage';

// This endpoint is what gets called when someone curls the site
export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if it's actually a curl request
  const isCurl = userAgent.toLowerCase().includes('curl') || 
                 userAgent.toLowerCase().includes('wget') ||
                 userAgent.toLowerCase().includes('httpie');

  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             '127.0.0.1';

  if (isCurl) {
    // Log the curl event
    try {
      const location = await getLocationFromIP(ip);
      await addCurlEvent({
        ip,
        country: location.country,
        countryCode: location.countryCode,
        timestamp: Date.now(),
        userAgent,
      });
    } catch (error) {
      console.error('Error logging curl event:', error);
    }

    // Return the rickroll script
    const script = generateRickrollScript();
    return new NextResponse(script, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // If not curl, redirect to homepage
  return NextResponse.redirect(new URL('/', request.url));
}

function generateRickrollScript(): string {
  return `#!/bin/bash

# ============================================
# WARNING: DON'T BE A DUMBASS!
# ============================================

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║  🚨 DON'T DOWNLOAD RANDOM SCRIPTS FROM THE INTERNET 🚨      ║"
echo "║                                                              ║"
echo "║  You just executed a script without checking what it does!  ║"
echo "║                                                              ║"
echo "║  This could have been:                                       ║"
echo "║  • Stealing your credentials                                 ║"
echo "║  • Installing backdoors                                      ║"
echo "║  • Compromising your entire system                           ║"
echo "║  • Exfiltrating sensitive data                               ║"
echo "║  • Installing malware or ransomware                          ║"
echo "║                                                              ║"
echo "║  Lucky for you, this is just an educational project! 😅      ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Now, enjoy your reward for being careless..."
echo ""
sleep 2

# ASCII Art Rickroll
clear
echo ""
echo "    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠛⠛⠛⠛⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣤⣤⣤⣤⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀"
echo "    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⠿⠿⠿⠿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
echo ""
echo "          🎵 Never gonna give you up 🎵"
echo "          🎵 Never gonna let you down 🎵"
echo "          🎵 Never gonna run around and desert you 🎵"
echo "          🎵 Never gonna make you cry 🎵"
echo "          🎵 Never gonna say goodbye 🎵"
echo "          🎵 Never gonna tell a lie and hurt you 🎵"
echo ""
echo "    ┌──────────────────────────────────────────────┐"
echo "    │  You've been RICKROLLED! 😂                  │"
echo "    │                                              │"
echo "    │  Learn more at: https://linenum.sh           │"
echo "    │  GitHub: github.com/thedr0pperx/linenum.sh   │"
echo "    │                                              │"
echo "    │  Stay safe. Review code before running it!   │"
echo "    └──────────────────────────────────────────────┘"
echo ""

# Pro tip for next time
echo ""
echo "💡 PRO TIP: Next time, do this instead:"
echo ""
echo "   curl https://example.com/script.sh -o script.sh"
echo "   cat script.sh  # Review the contents!"
echo "   chmod +x script.sh"
echo "   ./script.sh"
echo ""
echo "Your IP has been logged at linenum.sh for educational purposes. 📊"
echo ""
`;
}

