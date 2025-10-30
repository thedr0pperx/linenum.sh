'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CurlCommandBox() {
  const [os, setOs] = useState('linux');
  const [shell, setShell] = useState('bash');

  const commands = {
    linux: {
      bash: 'curl -s linenum.sh | bash',
      sh: 'curl -s linenum.sh | sh',
      zsh: 'curl -s linenum.sh | zsh',
    },
    macos: {
      bash: 'curl -s linenum.sh | bash',
      sh: 'curl -s linenum.sh | sh',
      zsh: 'curl -s linenum.sh | zsh',
    },
    unix: {
      bash: 'curl -s linenum.sh | bash',
      sh: 'curl -s linenum.sh | sh',
      ksh: 'curl -s linenum.sh | ksh',
    },
  };

  const command = commands[os as keyof typeof commands][shell as keyof typeof commands.linux];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="cyber-card max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-matrix-green mb-2 font-mono glow-text">
          🎯 Try It Yourself (We Dare You)
        </h2>
        <p className="text-gray-700 text-sm">
          Select your OS and shell, then copy and run this command. What could go wrong? 🤔
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-mono font-bold text-gray-700 mb-2">
            Operating System
          </label>
          <select
            value={os}
            onChange={(e) => setOs(e.target.value)}
            className="w-full px-4 py-2 bg-white border-2 border-matrix-green/30 rounded-lg
                     text-gray-900 font-mono focus:outline-none focus:border-matrix-green
                     transition-all cursor-pointer hover:border-matrix-green/60"
          >
            <option value="linux">Linux</option>
            <option value="macos">macOS</option>
            <option value="unix">Unix</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-mono font-bold text-gray-700 mb-2">
            Shell
          </label>
          <select
            value={shell}
            onChange={(e) => setShell(e.target.value)}
            className="w-full px-4 py-2 bg-white border-2 border-matrix-green/30 rounded-lg
                     text-gray-900 font-mono focus:outline-none focus:border-matrix-green
                     transition-all cursor-pointer hover:border-matrix-green/60"
          >
            {Object.keys(commands[os as keyof typeof commands]).map((sh) => (
              <option key={sh} value={sh}>
                {sh}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="code-box select-all cursor-text overflow-x-auto">
          {command}
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 px-4 py-2 bg-matrix-green text-white
                   font-mono font-bold rounded hover:bg-matrix-accent transition-all
                   hover:shadow-[0_0_15px_rgba(0,255,65,0.5)] text-sm"
        >
          📋 Copy
        </button>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
        <p className="text-yellow-800 text-sm font-bold">
          ⚠️ <strong>WARNING:</strong> Never run scripts from the internet without reviewing the source code first!
        </p>
      </div>
    </div>
  );
}

