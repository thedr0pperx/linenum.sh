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

  // Log the curl event (IP is used only to get country, not stored)
  try {
    const location = await getLocationFromIP(ip);
    await addCurlEvent({
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
# Rick Astley Animated ASCII Rickroll
# Adapted from johnsoupir/ASCII_Rickroll for linenum.sh educational project
# Original: https://github.com/johnsoupir/ASCII_Rickroll

red='\\x1b[38;5;9m'
yell='\\x1b[38;5;216m'
green='\\x1b[38;5;10m'
purp='\\x1b[38;5;171m'
cyan='\\x1b[38;5;51m'
reset='\\x1b[0m'
audpid=0

has?() { hash \$1 2>/dev/null; }
cleanup() { (( audpid > 1 )) && kill \$audpid 2>/dev/null; }
trap "cleanup" INT

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
echo ""
sleep 2

# Try to play audio in background if available
if has? ffplay; then
  curl -s https://keroserene.net/lol/roll.s16 | ffplay -nodisp -loglevel quiet -f s16le -ar 8000 -ac 1 - &>/dev/null &
  audpid=\$!
elif has? afplay; then
  curl -s https://keroserene.net/lol/roll.s16 > /tmp/roll.s16 2>/dev/null
  afplay /tmp/roll.s16 &>/dev/null &
  audpid=\$!
elif has? aplay; then
  curl -s https://keroserene.net/lol/roll.s16 | aplay -Dplug:default -q -f S16_LE -r 8000 &>/dev/null &
  audpid=\$!
elif has? play; then
  curl -s https://keroserene.net/lol/roll.gsm > /tmp/roll.gsm.wav 2>/dev/null
  play -q /tmp/roll.gsm.wav &>/dev/null &
  audpid=\$!
fi

clear

# Animated Rickroll - Credit: johnsoupir/ASCII_Rickroll
echo -e "\${cyan}"
echo "      ,----------------,              ,---------,"
echo "     ,-----------------------,          ,\\"        ,\\"|"
echo "   ,\\"                      ,\\"|        ,\\"        ,\\"  |"
echo "  +-----------------------+  |      ,\\"        ,\\"    |"
echo "  |  .-----------------.  |  |     +---------+      |"
echo "  |  |                 |  |  |     | -==----'|      |"
echo "  |  |  Never Gonna    |  |  |     |         |      |"
echo "  |  |  Give You Up!   |  |  |/----|\\\\\\\\---=   |      |"
echo "  |  |  C:\\\\>_          |  |  |   ,/|==== ooo |      ;"
echo "  |  |                 |  |  |  // |(((( [33]|    ,\\"

echo "  |  \\\\-----------------'  |,\\" .;'| |((((     |  ,\\"
echo "  +-----------------------+  ;;  | |         |,\\"
echo "     /_)______________(_/  //'   | +---------+"

sleep 1
echo -e "\${purp}"
echo ""
echo "    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿"
echo "    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿"
echo "    ⣿⣿⣿⣿⠟⠋⠉⠉⠉⠉⠉⠛⠻⣿⣿⣿⣿⠟⠛⠉⠉⠉⠉⠉⠙⠻⣿⣿⣿⣿"
echo "    ⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿"
echo "    ⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿"
echo "    ⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿"
echo "    ⣿⡇⠀⠀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⡀⠀⣿⣿"
echo "    ⣿⡇⠀⠘⠿⠿⠿⠿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠿⠿⠿⠿⠃⠀⣿⣿"
echo "    ⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿"
echo "    ⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿"
echo "    ⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿"
echo "    ⣿⣿⣿⣿⣿⣦⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣿⣿⣿⣿⣿⣿⣿"
echo "    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿"
sleep 1

echo -e "\${green}"
echo "          🎵 ♫ ♪ ♫ 🎵"
echo "          🎶 Music Playing 🎶"
sleep 2

# Big reveal
clear
echo ""
echo -e "\${red}"
echo "    ┌──────────────────────────────────────────────┐"
echo "    │                                              │"
echo "    │         You've been RICKROLLED! 😂           │"
echo "    │                                              │"
echo -e "    │  \${purp}Learn more at: https://linenum.sh\${red}           │"
echo -e "    │  \${green}GitHub: github.com/thedr0pperx/linenum.sh\${red}   │"
echo "    │                                              │"
echo "    │  Stay safe. Review code before running it!   │"
echo "    │                                              │"
echo "    └──────────────────────────────────────────────┘"
echo -e "\${reset}"
echo ""
sleep 2

# Educational outro
echo -e "\${yell}💡 PRO TIP: Next time, do this instead:\${reset}"
echo ""
echo -e "\${green}   curl https://example.com/script.sh -o script.sh"
echo "   cat script.sh  # Review the contents!"
echo "   chmod +x script.sh"
echo -e "   ./script.sh\${reset}"
echo ""
echo -e "\${cyan}ASCII Rickroll adapted from: github.com/johnsoupir/ASCII_Rickroll\${reset}"
echo -e "\${green}<3 Stay safe, stay skeptical! <3\${reset}"
echo ""
echo -en "\\x1b[?25h"  # Show cursor again

cleanup
`;
}
