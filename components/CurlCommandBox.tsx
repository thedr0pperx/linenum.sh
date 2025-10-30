'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type OSConfig = {
  label: string;
  defaultShell: string;
  shells: string[];
  command: (shell: string) => string;
};

type OSConfigs = {
  [key: string]: OSConfig;
};

export default function CurlCommandBox() {
  const osConfigs: OSConfigs = {
    ubuntu: {
      label: 'Ubuntu',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh', 'dash'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    debian: {
      label: 'Debian',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh', 'dash'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    kali: {
      label: 'Kali Linux',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    parrot: {
      label: 'Parrot OS',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    centos: {
      label: 'CentOS',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    rhel: {
      label: 'Red Hat Enterprise Linux',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    fedora: {
      label: 'Fedora',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    arch: {
      label: 'Arch Linux',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh', 'fish'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    manjaro: {
      label: 'Manjaro',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh', 'fish'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    alpine: {
      label: 'Alpine Linux',
      defaultShell: 'sh',
      shells: ['sh', 'bash', 'ash'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    macos: {
      label: 'macOS',
      defaultShell: 'zsh',
      shells: ['zsh', 'bash', 'sh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    windows: {
      label: 'Windows (WSL)',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    'windows-powershell': {
      label: 'Windows (PowerShell)',
      defaultShell: 'powershell',
      shells: ['powershell'],
      command: () => `iwr -useb linenum.sh | iex`,
    },
    freebsd: {
      label: 'FreeBSD',
      defaultShell: 'sh',
      shells: ['sh', 'bash', 'zsh', 'csh', 'tcsh'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    openbsd: {
      label: 'OpenBSD',
      defaultShell: 'ksh',
      shells: ['ksh', 'sh', 'bash'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
    generic: {
      label: 'Generic Linux',
      defaultShell: 'bash',
      shells: ['bash', 'sh', 'zsh', 'ksh', 'dash'],
      command: (shell) => `curl -s linenum.sh | ${shell}`,
    },
  };

  const [os, setOs] = useState('ubuntu');
  const [shell, setShell] = useState(osConfigs.ubuntu.defaultShell);

  // Auto-update shell when OS changes
  useEffect(() => {
    const defaultShell = osConfigs[os]?.defaultShell || 'bash';
    setShell(defaultShell);
  }, [os]);

  const currentConfig = osConfigs[os] || osConfigs.generic;
  const command = currentConfig.command(shell);

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
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-matrix-green mb-2 font-mono glow-text">
          🚀 Quick Install
        </h2>
        <p className="text-gray-700 text-xs sm:text-sm">
          Select your OS and shell, then copy and run the command to download and execute LinEnum.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs sm:text-sm font-mono font-bold text-gray-700 mb-1.5 sm:mb-2">
            Operating System
          </label>
          <select
            value={os}
            onChange={(e) => setOs(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 bg-white border-2 border-matrix-green/30 rounded-lg
                     text-gray-900 font-mono text-sm focus:outline-none focus:border-matrix-green
                     transition-all cursor-pointer hover:border-matrix-green/60"
          >
            <optgroup label="Linux Distributions">
              <option value="ubuntu">Ubuntu</option>
              <option value="debian">Debian</option>
              <option value="kali">Kali Linux</option>
              <option value="parrot">Parrot OS</option>
              <option value="rhel">Red Hat Enterprise Linux</option>
              <option value="centos">CentOS</option>
              <option value="fedora">Fedora</option>
              <option value="arch">Arch Linux</option>
              <option value="manjaro">Manjaro</option>
              <option value="alpine">Alpine Linux</option>
              <option value="generic">Generic Linux</option>
            </optgroup>
            <optgroup label="Unix-like">
              <option value="macos">macOS</option>
              <option value="freebsd">FreeBSD</option>
              <option value="openbsd">OpenBSD</option>
            </optgroup>
            <optgroup label="Windows">
              <option value="windows">Windows (WSL)</option>
              <option value="windows-powershell">Windows (PowerShell)</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-mono font-bold text-gray-700 mb-1.5 sm:mb-2">
            Shell {currentConfig.defaultShell && <span className="text-xs text-gray-500 hidden sm:inline">(default: {currentConfig.defaultShell})</span>}
          </label>
          <select
            value={shell}
            onChange={(e) => setShell(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 bg-white border-2 border-matrix-green/30 rounded-lg
                     text-gray-900 font-mono text-sm focus:outline-none focus:border-matrix-green
                     transition-all cursor-pointer hover:border-matrix-green/60"
          >
            {currentConfig.shells.map((sh) => (
              <option key={sh} value={sh}>
                {sh}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="code-box select-all cursor-text overflow-x-auto text-xs sm:text-sm">
          {command}
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-matrix-green text-white
                   font-mono font-bold rounded hover:bg-matrix-accent transition-all
                   hover:shadow-[0_0_15px_rgba(0,255,65,0.5)] text-xs sm:text-sm"
        >
          📋 <span className="hidden xs:inline">Copy</span>
        </button>
      </div>
    </div>
  );
}

