import { NextRequest, NextResponse } from 'next/server';
import { getLocationFromIP } from '@/lib/geolocation';
import { addCurlEvent } from '@/lib/storage';

// This endpoint is what gets called when someone curls the site
export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             '127.0.0.1';

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
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

function generateRickrollScript(): string {
  return `#!/bin/bash
# Rick Astley in your Terminal - Pure Bash Edition
# Adapted for linenum.sh

red='\\x1b[38;5;9m'
yell='\\x1b[38;5;216m'
green='\\x1b[38;5;10m'
purp='\\x1b[38;5;171m'
cyan='\\x1b[38;5;14m'
reset='\\x1b[0m'

echo -en "\\x1b[?25l"  # Hide cursor
clear

# Warning message
echo -e "\${red}"
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
echo -e "\${reset}"
echo ""
echo -e "\${yell}Now, enjoy your reward for being careless...\${reset}"
sleep 2
clear

# Animated Rick Astley ASCII Art
echo -e "\${purp}"
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
echo -e "\${reset}"
echo ""
sleep 1

# Animated song lyrics with colors
echo -e "\${cyan}          🎵 Never gonna give you up 🎵\${reset}"
sleep 0.8
echo -e "\${green}          🎵 Never gonna let you down 🎵\${reset}"
sleep 0.8
echo -e "\${yell}          🎵 Never gonna run around and desert you 🎵\${reset}"
sleep 0.8
echo -e "\${purp}          🎵 Never gonna make you cry 🎵\${reset}"
sleep 0.8
echo -e "\${cyan}          🎵 Never gonna say goodbye 🎵\${reset}"
sleep 0.8
echo -e "\${green}          🎵 Never gonna tell a lie and hurt you 🎵\${reset}"
sleep 1
echo ""

# Big reveal
echo -e "\${red}"
echo "    ┌──────────────────────────────────────────────┐"
echo "    │  You've been RICKROLLED! 😂                  │"
echo "    │                                              │"
echo -e "    │  \${purp}Learn more at: https://linenum.sh\${red}           │"
echo -e "    │  \${cyan}GitHub: github.com/thedr0pperx/linenum.sh\${red}   │"
echo "    │                                              │"
echo "    │  Stay safe. Review code before running it!   │"
echo "    └──────────────────────────────────────────────┘"
echo -e "\${reset}"
echo ""
sleep 1

# Educational outro
echo -e "\${yell}💡 PRO TIP: Next time, do this instead:\${reset}"
echo ""
echo -e "\${green}   curl https://example.com/script.sh -o script.sh"
echo "   cat script.sh  # Review the contents!"
echo "   chmod +x script.sh"
echo -e "   ./script.sh\${reset}"
echo ""
echo -e "\${purp}Your IP has been logged at linenum.sh for educational purposes. 📊\${reset}"
echo ""
echo -e "\${cyan}<3 Stay safe, stay skeptical! <3\${reset}"
echo ""
echo -en "\\x1b[?25h"  # Show cursor again
`;
}

