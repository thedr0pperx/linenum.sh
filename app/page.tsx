import MatrixBackground from '@/components/MatrixBackground';
import CurlCommandBox from '@/components/CurlCommandBox';
import LiveCurlFeed from '@/components/LiveCurlFeed';
import Leaderboard from '@/components/Leaderboard';
import WorldMap from '@/components/WorldMap';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <MatrixBackground />
      
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-matrix-green mb-3 sm:mb-4 font-mono glow-text leading-tight">
            LinEnum.sh
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-mono mb-3 sm:mb-4 px-2">
            Scripted Local Linux Enumeration & Privilege Escalation Checks
          </p>
          <p className="text-sm sm:text-md text-gray-600 max-w-2xl mx-auto px-4">
            A comprehensive shell script for enumerating Linux systems. Designed for penetration testers and security researchers to quickly identify privilege escalation vectors.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* Curl Command Box */}
        <section>
          <CurlCommandBox />
        </section>

        {/* About Section */}
        <section className="cyber-card max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-matrix-green mb-3 sm:mb-4 font-mono glow-text">
            📋 About LinEnum
          </h2>
          <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
            <p>
              <strong className="text-matrix-green">LinEnum</strong> is designed to automate the local Linux enumeration and privilege escalation checks.
            </p>
            <p>
              The script checks for common misconfigurations and vulnerabilities including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base">
              <li>Kernel and distribution version information</li>
              <li>User and group information</li>
              <li>SUID/SGID files and capabilities</li>
              <li>World-writable files and directories</li>
              <li>Running processes and services</li>
              <li>Network configuration and connections</li>
              <li>Scheduled jobs (cron, systemd timers)</li>
              <li>SSH keys and configuration</li>
            </ul>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
              Used by security professionals worldwide for penetration testing and security audits.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <LiveCurlFeed />
          <Leaderboard />
        </section>

        {/* World Map */}
        <section>
          <WorldMap />
        </section>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-12 sm:mt-16 border-t-2 border-matrix-green/30">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Link
              href="https://github.com/thedr0pperx/linenum.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white
                       font-mono font-bold rounded-lg hover:bg-gray-800 transition-all text-sm sm:text-base
                       hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] border-2 border-gray-700"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="hidden xs:inline">Source Code</span>
              <span className="xs:hidden">Code</span>
            </Link>
          </div>
          <p className="text-gray-600 font-mono text-xs sm:text-sm px-4">
            Maintained by{' '}
            <Link 
              href="https://github.com/thedr0pperx" 
              target="_blank"
              className="text-matrix-green hover:underline font-bold"
            >
              @thedr0pperx
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}

